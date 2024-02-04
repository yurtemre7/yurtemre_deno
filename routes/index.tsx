import NewYearCountdown from "../islands/NewYear.tsx";
import AboutMe from "../islands/about.tsx";
import WordOfTheDay from "../components/word_of_day.tsx";
// import ChatScreen from "../islands/ai_chat.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { WOTD } from '../components/classes/WOTD.ts';
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";
import { Repositories } from "../components/classes/Github.ts";
import MyProjects from "../components/my_projects.tsx";

interface InitialData {
  wotd: WOTD;
  repositories: Repositories;
}

let reps: Repositories = [];
let lastFetch = Date.parse("2020-01-01");

export const handler: Handlers<InitialData> = {
  HEAD(_req, ctx) {
    // head response
    return new Response("", {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
      statusText: "OK",
    });
  },
  async GET(_req, ctx) {
    const url = 'https://www.duden.de'
    const resp = await fetch(url)
    const html_data = await resp.text()
    const doc = new DOMParser().parseFromString(html_data, 'text/html')
    let wotd: WOTD = { word: '', link: '' };
    if (doc !== null) {
      const word = doc.querySelector('#block-wordoftheday a.scene__title-link');
      if (word !== null) {
        const link = word!.getAttribute('href');
        const textContent = link?.split('/').reverse()[0] || '';
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

export default function Home({ data }: PageProps<InitialData>) {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-500">
        <div className="text-center pb-8 pt-8">
          <h1 className="text-6xl font-bold text-white mb-4">yurtemre.de</h1>
          <blockquote className="text-white text-xl italic font-semibold">
            <p>"Die wirklich krasseste Website der Erde"</p>
          </blockquote>
          <p className="text-white text-2xl"></p>
          <div className="mt-12 mb-12">
            <button className="bg-white text-blue-800 rounded shadow-lg py-2 px-4 hover:bg-blue-800 hover:text-white transition-colors duration-300"><a
              href="#contact-me"
            >
              Kontaktiere mich hier
            </a></button>
          </div>
          <div id="wotd" className="flex items-center justify-center text-center text-white mt-6">
            <WordOfTheDay word={data.wotd.word} link={data.wotd.link} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-800">
        <figure className="items-center justify-center py-4 bg-blue-800 text-white">
          <svg className="w-10 h-10 mx-auto mb-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium  text-center text-white">"zzZ... zzZ... zzZ..."</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-400">
              <cite className="pe-3 font-medium text-white">Teoman W.</cite>
              <cite className="ps-3 text-sm text-white">Informatik Student</cite>
            </div>
          </figcaption>
        </figure>
        <figure className="items-center justify-center py-4 bg-blue-800 text-white">
          <svg className="w-10 h-10 mx-auto mb-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-center text-white">"Sieht gut aus für'n Anfänger."</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-400">
              <cite className="pe-3 font-medium text-white">Jason C.</cite>
              <cite className="ps-3 text-sm text-white">Elektrotechnik Student</cite>
            </div>
          </figcaption>
        </figure>
        <figure className="items-center justify-center py-4 bg-blue-800 text-white">
          <svg className="w-10 h-10 mx-auto mb-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-center text-white">"iiiiiiieeeeeehhh Javascript !!!"</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-400">
              <cite className="pe-3 font-medium text-white">Joshua S.</cite>
              <cite className="ps-3 text-sm text-white">Developer of J.dev, Ex-developer of SNP👍🏼</cite>
            </div>
          </figcaption>
        </figure>
      </div>

      {/* <div id="ai-chat" className="pt-8 pb-8 bg-blue-300 text-white">
        <ChatScreen />
      </div> */}





      <div id="about-me" className="pt-8 pb-8 bg-blue-600 text-white">
        <AboutMe />
      </div>
      <div className="pt-8 pb-8 bg-blue-700 text-white">
        <MyProjects repos={data.repositories} />
      </div>

      <div id="new-year">
        <NewYearCountdown />
      </div>

      <div id="contact-me" className="min-h-screen flex items-center justify-center bg-blue-700">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Du findest mich hier 👇</h2>
          <div className="flex justify-center mt-6">
            <a href="https://t.me/emredev" className="text-white underline hover:text-blue-200 mx-4 p-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-300">Telegram</a>
            <a href="mailto:info@yurtemre.de" className="text-white underline hover:text-blue-200 mx-4 p-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-300">Email</a>
          </div>
        </div>
      </div>

      <footer className="bg-blue-800 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <div>
            <p>© 2020 - {new Date().getFullYear()} yurtemre.de</p>
            {/* row */}
            <div className="flex mt-1">
              <p>Made with fresh</p>
              <div className="ml-2" />
              <img
                src="/logo.svg"
                height="22px"
                width="22px"
                alt="the fresh logo: a sliced lemon dripping with juice"
              />
            </div>
          </div>
          <div>
            <a href="/impressum" className="underline hover:text-blue-200 mr-4">Impressum</a>
            <a href="/datenschutz" className="underline hover:text-blue-200">Datenschutz</a>
          </div>
        </div>
      </footer>
    </>
  );
}