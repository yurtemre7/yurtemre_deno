/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";


export default function Welcome({joke} : string) {
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
