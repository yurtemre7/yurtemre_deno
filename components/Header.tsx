/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Header() {
  return (
    <div class={tw`flex flex-row items-center content-between m-10`}>
      <a href="/gvm" class={tw`text-blue-500 flex-auto`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          class="bi bi-code"
          viewBox="0 0 16 16"
        >
          <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
        </svg>
      </a>
      <div class={tw`dark:bg-black text-white flex-auto`}>
        <h1 class={tw`text-4xl font-bold text-center`}>yurtemre.de</h1>
        <p class={tw`text-xl font-bold text-center`}>by Emre Yurtseven</p>
      </div>
      <div class={tw`text-black flex-auto`}>
        <svg
          class={tw`w-6 h-6`}
          fill="none"
          width="36"
          height="36"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          >
          </path>
        </svg>
      </div>
    </div>
  );
}
