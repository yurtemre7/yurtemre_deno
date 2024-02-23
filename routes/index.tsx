import NewYearCountdown from "../islands/NewYear.tsx";
import AboutMe from "../islands/about.tsx";
import WordOfTheDay from "../components/word_of_day.tsx";
// import ChatScreen from "../islands/ai_chat.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { WOTD } from '../components/classes/WOTD.ts';
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";
import { Repositories } from "../components/classes/Github.ts";
import MyProjects from "../components/my_projects.tsx";
import Rezensionen from "../components/rezensionen.tsx";
import MyFooter from "../components/my_footer.tsx";

interface InitialData {
  wotd: WOTD;
  repositories: Repositories;
}

let reps: Repositories = [];
let lastFetch = Date.parse("2020-01-01");

export const handler: Handlers<InitialData> = {
  HEAD(_req, ctx) {
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

    // const url = 'https://www.duden.de'
    // const resp = await fetch(url)
    // const html_data = await resp.text()
    // const doc = new DOMParser().parseFromString(html_data, 'text/html')
    
    // if (doc !== null) {
    //   const word = doc.querySelector('#block-wordoftheday a.scene__title-link');
    //   if (word !== null) {
    //     const link = word!.getAttribute('href');
    //     const textContent = link?.split('/').reverse()[0] || '';
    //     wotd = {
    //       word: textContent,
    //       link: url + link,
    //     };
    //   }
    // }

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

      <div id="rezensionen">
        <Rezensionen/>
      </div>

      {/* <div id="ai-chat" className="pt-8 pb-8 bg-blue-300 text-white">
        <ChatScreen />
      </div> */}

      <div id="about-me" className="pt-8 pb-8 bg-blue-600 text-white">
        <AboutMe />
      </div>
      <div id="my-projects" className="pt-8 pb-8 bg-blue-700 text-white">
        <MyProjects repos={data.repositories} />
      </div>

      <div id="new-year">
        <NewYearCountdown />
      </div>

      <div id="contact-me" className="min-h-screen flex items-center justify-center bg-blue-700">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Du findest mich hier 👇</h2>
          <div className="flex justify-center mt-6">
            <a href="https://t.me/emredev" className="text-white hover:text-blue-200 mx-4 p-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-300">Telegram</a>
            <a href="mailto:info@yurtemre.de" className="text-white hover:text-blue-200 mx-4 p-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-300">E-Mail</a>
          </div>
        </div>
      </div>

      <MyFooter />
    </>
  );
}