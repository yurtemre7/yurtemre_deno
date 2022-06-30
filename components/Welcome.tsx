/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Welcome() {
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
            Willkommen auf der Website von Emre Yurtseven
          </p>
        </div>
      </div>
    </div>
  );
}
