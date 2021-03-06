/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function MyFooter() {
  return (
    <footer class={tw`p-10`}>
      <div class={tw`flex flex-wrap items-center justify-center`}>
        <p class={tw`text-center`}>
          <a
            href="https://t.me/emredev"
            class={tw`text-blue-500 hover:underline`}
          >
            Telegram
          </a>
        </p>

        <div class={tw`m-4`} />

        <p class={tw`text-center`}>
          <a
            href="https://github.com/yurtemre7"
            class={tw`text-blue-500 hover:underline`}
          >
            GitHub
          </a>
        </p>

        <div class={tw`m-4`} />

        <p class={tw`text-center`}>
          <a
            href="impressum"
            class={tw`text-blue-500 hover:underline`}
          >
            Impressum
          </a>
        </p>

        <div class={tw`m-4`} />

        <p class={tw`text-center text-gray-500`}>
          © {new Date().getFullYear()} Emre Yurtseven
        </p>

        <div class={tw`m-4`} />

        <p class={tw`text-center text-gray-500`}>
          made with `fresh` @ Deno
        </p>
        <div class={tw`ml-4`} />
        <img
          src="/logo.svg"
          height="22px"
          width="22px"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
      </div>
    </footer>
  );
}
