/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <head>
        <title>yurtemre.de</title>
      </head>
      <p class={tw`my-6`}>
        Welcome to `fresh`, Emre.
      </p>

      {/* Footer */}
      <footer class={tw`text-center`}>
        
      </footer>


      <footer>
        <div class={tw`text-center`}>
        <p class={tw`text-center`}>
          <a href="https://t.me/emredev" class={tw`text-blue-500`}>
            @yurtemre
          </a>
        </p>
        <p class={tw`text-center`}>
          © {new Date().getFullYear()} Emre Yurtseven
        </p>
        </div>
      </footer>
    </div>
  );
  /*return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Welcome to `fresh`, Emre. Try update this message in the ./routes/index.tsx
        file, and refresh.
      </p>
      <Counter start={3} />
    </div>
  )*/
}
