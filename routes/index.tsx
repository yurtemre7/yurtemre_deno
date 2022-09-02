/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Welcome from "../components/Welcome.tsx";
import Divider from "../components/Divider.tsx";
import About from "../components/About.tsx";
import MyFooter from "../components/MyFooter.tsx";
import { Repositories } from "../components/classes/Github.ts";
import MeineProjekte from "../components/MeineProjekte.tsx";

interface InitialData {
  joke: string;
  repositories: Repositories;
}

export const handler: Handlers<InitialData> = {
  async GET(_req, ctx) {
    const JOKES = [
      "Why do Java developers often wear glasses? They can't C#.",
      "A SQL query walks into a bar, goes up to two tables and says “can I join you?”",
      "Wasn't hard to crack Forrest Gump's password. 1forrest1.",
      "I love pressing the F5 key. It's refreshing.",
      "Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”",
      "There are 10 types of people in the world. Those who understand binary and those who don't.",
      "Why are assembly programmers often wet? They work below C level.",
      "My favourite computer based band is the Black IPs.",
      "What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.",
      "Why was the developer bankrupt? He'd used all his cache.",
      "An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.",
      "A friend is in a band called 1023Mb. They haven't had a gig yet.",
      "If you listen to a UNIX shell, can you hear the C?",
      "Why do programmers confuse Halloween with Christmas? Because 31OCT=25DEC.",
      "What is the difference between a programmer and a non-programmer? The non-programmer thinks a kilobyte is 1000 bytes while a programmer is convinced that a kilometre is 1024 metres.",
    ];

    const joke = JOKES[new Date().getDate() % JOKES.length];
    const repositories = await fetch(
      "https://api.github.com/users/yurtemre7/repos",
    );
    const json = await repositories.json();
    if (json.message !== undefined) {
      const data: InitialData = {
        joke,
        repositories: [],
      };
      return ctx.render(data);
    }
    const data: InitialData = {
      joke,
      repositories: await repositories.json(),
    };
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<InitialData>) {
  return (
    <html class={tw`dark:bg-black h-full w-full`}>
      <div class={tw`dark:bg-black h-full w-full`}>
        <head>
          <title>yurtemre.de</title>
        </head>

        <Welcome joke={data.joke} />

        <Divider />

        <About />

        <Divider />

        <MeineProjekte repos={data.repositories} />

        <MyFooter />
      </div>
    </html>
  );
}
