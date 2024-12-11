import { Handlers, PageProps } from "$fresh/server.ts";
import { Repositories } from "../components/classes/Github.ts";
import { WOTD } from "../components/classes/WOTD.ts";
import Home from "../islands/index.tsx";
import { DOMParser } from "jsr:@b-fuze/deno-dom";


interface InitialData {
    wotd: WOTD;
    repositories: Repositories;
  }
  
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
    async GET(_req, ctx) {
      let wotd: WOTD = { word: '', link: '' };
  
      const url = 'https://www.duden.de'
      const resp = await fetch(url)
      const html_data = await resp.text()
      const doc = new DOMParser().parseFromString(html_data, 'text/html')
  
      if (doc !== null) {
        const word = doc.querySelector('#block-numero-wordoftheday a.scene__title-link');
        if (word !== null) {
          const link = word!.getAttribute('href');
          const a_txt = word!.innerText.replace(/[\u00AD\u002D\u2011]+/g,'');
          const textContent = a_txt; // link?.split('/').reverse()[0] || '';
          wotd = {
            word: textContent,
            link: url + link,
          };
        }
      }
  
      if (Date.now() - lastFetch > 1000 * 60 * 5) {
        const repositories = await fetch(
          "https://api.github.com/users/yurtemre7/repos",
        );
        const fetched = await repositories.json();
        if (fetched.message !== undefined) {
          const data: InitialData = {
            wotd: wotd,
            repositories: [],
          };
          return ctx.render(data);
        }
        reps = fetched;
        lastFetch = Date.now();
      }
  
      const data: InitialData = {
        wotd: wotd,
        repositories: reps,
      };
  
      return ctx.render(data);
    },
  };

export default function Index({ data }: PageProps<InitialData>) {
  return (
    <Home repositories={data.repositories} wotd={data.wotd}/>
  );
}
