import { Handlers, PageProps } from "$fresh/server.ts";
import { InitialData } from "../components/classes/InitialData.ts";
import { WOTD } from "../components/classes/WOTD.ts";
import Home from "../islands/index2.tsx";
import { DOMParser } from "jsr:@b-fuze/deno-dom";

const SUPPORTED_LANGUAGES = ["en", "ja", "tr"];

function getPreferredLanguage(acceptLanguageHeader: string): string {
  const preferences = acceptLanguageHeader
    .split(",")
    .map((part) => {
      const [tag, q] = part.split(";q=");
      const primary = tag.trim().toLowerCase().split("-")[0];
      const quality = q ? parseFloat(q) : 1.0;
      return { tag: primary, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const pref of preferences) {
    if (SUPPORTED_LANGUAGES.includes(pref.tag)) {
      return pref.tag;
    }
  }

  return "en";
}

type WOTDCache = { time: number; data: WOTD | null };
const WOTD_TTL_MS = 12 * 1000 * 60 * 60; // 12 hour

export const handler: Handlers<InitialData> = {
  async GET(req, ctx) {
    let wotd: WOTD = { word: "", link: "" };

    const url = new URL(req.url);
    const langParam = url.searchParams.get("lang")?.toLowerCase() ?? undefined;

    const acceptLanguage = req.headers.get("accept-language") || "";
    const prefLang = getPreferredLanguage(acceptLanguage);

    const lang = SUPPORTED_LANGUAGES.includes(langParam ?? "")
      ? (langParam as (typeof SUPPORTED_LANGUAGES)[number])
      : prefLang;

    try {
      // in-memory cache across requests (per process)
      const g = globalThis as unknown as { __WOTD_CACHE?: WOTDCache };
      if (!g.__WOTD_CACHE) g.__WOTD_CACHE = { time: 0, data: null };

      const now = Date.now();
      if (g.__WOTD_CACHE.data && now - g.__WOTD_CACHE.time < WOTD_TTL_MS) {
        wotd = g.__WOTD_CACHE.data;
      } else {
        // Fetch word of the day from Duden
        const dudenUrl = "https://www.duden.de";
        const resp = await fetch(dudenUrl);
        const html_data = await resp.text();
        const doc = new DOMParser().parseFromString(html_data, "text/html");

        if (doc !== null) {
          const word = doc.querySelector(
            "#block-numero-wordoftheday a.scene__title-link",
          );
          if (word !== null) {
            const link = word.getAttribute("href") ?? "";
            const a_txt = word.innerText.replace(/[\u00AD\u002D\u2011]+/g, "");
            wotd = {
              word: a_txt,
              link: dudenUrl + link,
            };
          }
        }
        g.__WOTD_CACHE = { time: now, data: wotd };
      }
    } catch {
      // keep defaults on failure
    }

    const data: InitialData = {
      wotd: wotd,
      lang: lang ?? "en",
    };

    return await ctx.render(data);
  },
};

export default function Index({ data }: PageProps<InitialData>) {
  return <Home wotd={data.wotd} lang={data.lang} />;
}
