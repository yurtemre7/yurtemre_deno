/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers<string> = {
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
      "Why was the developer bankrupt? He’d used all his cache.",
      "An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.",
      "A friend is in a band called 1023Mb. They haven’t had a gig yet.",
      "If you listen to a UNIX shell, can you hear the C?",
      "Why do programmers confuse Halloween with Christmas? Because 31OCT=25DEC.",
      "What is the difference between a programmer and a non-programmer? The non-programmer thinks a kilobyte is 1000 bytes while a programmer is convinced that a kilometre is 1024 metres.",
    ];

    const joke = JOKES[new Date().getDate() % JOKES.length];
    return await ctx.render(joke);
  },
};

export default function Welcome(joke: string) {
  // Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
  return (
    <div class={tw`dark:bg-black m-10`}>
      <div
        class={tw`h-screen text-center flex items-center justify-center`}
      >
        <div class={tw`dark:text-gray-500`}>
          <p class={tw`text-5xl font-bold hover:underline`}>
            Hey Du 😄
          </p>
          <div class={tw`m-10`} />
          <p class={tw`text-xl`}>
            Willkommen auf meiner Website, ich grüße Dich. 🖐️
          </p>
          <div class={tw`m-10`} />
          <p class={tw`text-xl`}>
            Der Witz des Tages:
          </p>
          <div class={tw`m-5`} />
          <p
            class={tw`text-xl`}
          >
            {joke}
          </p>
        </div>
      </div>
    </div>
  );
}
