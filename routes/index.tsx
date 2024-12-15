import { Handlers, PageProps } from "$fresh/server.ts";
import { Repositories } from "../components/classes/Github.ts";
import { WOTD } from "../components/classes/WOTD.ts";
import Home from "../islands/index.tsx";
import { DOMParser } from "jsr:@b-fuze/deno-dom";

interface InitialData {
  wotd: WOTD;
  repositories: Repositories;
  lang: string; // Added to store the language
}

const SUPPORTED_LANGUAGES = ["en", "jp"]; // Add your supported languages here

let reps: Repositories = [];
let lastFetch = Date.parse("2020-01-01");

export const handler: Handlers<InitialData> = {
  HEAD(_req, _ctx) {
    return new Response("", {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
      statusText: "OK",
    });
  },

  async GET(req, ctx) {
    let wotd: WOTD = { word: '', link: '' };
    
    // Extract the `lang` parameter from the query string
    const url = new URL(req.url);
    const langParam = url.searchParams.get("lang");

    // Extract the `Accept-Language` header
    const acceptLanguage = req.headers.get("accept-language") || "";
    const prefersJapanese = acceptLanguage.includes("ja");

    // Determine the language to use
    let lang = SUPPORTED_LANGUAGES.includes(langParam ?? "") // Check query parameter
      ? langParam // Use query parameter if valid
      : prefersJapanese // Fallback to Accept-Language header
        ? "jp"
        : "en"; // Default to English

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

    // Fetch repositories every 5 minutes
    if (Date.now() - lastFetch > 1000 * 60 * 5) {
      const repositories = await fetch("https://api.github.com/users/yurtemre7/repos");
      const fetched = await repositories.json();
      if (fetched.message !== undefined) {
        const data: InitialData = {
          wotd: wotd,
          repositories: [],
          lang: lang, // Pass the language to the initial data
        };
        return ctx.render(data);
      }
      reps = fetched;
      lastFetch = Date.now();
    }

    const data: InitialData = {
      wotd: wotd,
      repositories: reps,
      lang: lang, // Pass the language to the initial data
    };

    return await ctx.render(data);
  },
};

export default function Index({ data }: PageProps<InitialData>) {
  return (
    <Home repositories={data.repositories} wotd={data.wotd} lang={data.lang} />
  );
}