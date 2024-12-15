import { Handlers, PageProps } from "$fresh/server.ts";
import { InitialData } from "../components/classes/InitialData.ts";
import { WOTD } from "../components/classes/WOTD.ts";
import Home from "../islands/index.tsx";
import { DOMParser } from "jsr:@b-fuze/deno-dom";

const SUPPORTED_LANGUAGES = ["en", "jp"];

export const handler: Handlers<InitialData> = {
  async GET(req, ctx) {
    let wotd: WOTD = { word: '', link: '' };

    const url = new URL(req.url);
    const langParam = url.searchParams.get("lang");

    const acceptLanguage = req.headers.get("accept-language") || "";
    const prefersJapanese = acceptLanguage.includes("ja");

    let lang = SUPPORTED_LANGUAGES.includes(langParam ?? "")
      ? langParam
      : prefersJapanese
        ? "jp"
        : "en";

    if (lang === null) {
      lang = "en";
    }

    // Fetch word of the day from Duden
    const dudenUrl = 'https://www.duden.de';
    const resp = await fetch(dudenUrl);
    const html_data = await resp.text();
    const doc = new DOMParser().parseFromString(html_data, 'text/html');

    if (doc !== null) {
      const word = doc.querySelector('#block-numero-wordoftheday a.scene__title-link');
      if (word !== null) {
        const link = word.getAttribute('href');
        const a_txt = word.innerText.replace(/[\u00AD\u002D\u2011]+/g, '');
        wotd = {
          word: a_txt,
          link: dudenUrl + link,
        };
      }
    }

    const data: InitialData = {
      wotd: wotd,
      lang: lang,
    };

    return await ctx.render(data);
  },
};

export default function Index({ data }: PageProps<InitialData>) {
  return (
    <Home wotd={data.wotd} lang={data.lang} />
  );
}