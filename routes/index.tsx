/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class={tw`dark:bg-black w-screen h-screen`}>
      <div class={tw`p-4`}>
        <head>
          <title>yurtemre.de</title>
        </head>

        <div class={tw`m-6 text-center dark:text-gray-500 mx-auto`}>
          <p class={tw`text-5xl font-bold`}>
            Hey Du 😄
          </p>
          <div class={tw`m-10`} />
          <p class={tw`text-xl`}>
            Emre ist ein Informatik Student im 4. Semester an der{"  "}
            <a class={tw`text-blue-500`} href="https://www.tu.berlin/">
              TU Berlin
            </a>{" "}
            und arbeitet in der Cross-Platform App-Entwicklung mit{"  "}
            <a class={tw`text-blue-500`} href="https://flutter.dev">
              Flutter
            </a>{" "}
            am{" "}
            <a class={tw`text-blue-500`} href="https://www.appmelder.de">
              Appmelder
            </a>.
          </p>
        </div>

        <footer class={tw`content-end`}>
          <div class={tw`flex flex-row items-center justify-center`}>
            <p class={tw`text-center`}>
              <a href="https://t.me/emredev" class={tw`text-blue-500`}>
                Telegram
              </a>
            </p>

            <div class={tw`m-4`} />

            <p class={tw`text-center`}>
              <a
                href="https://github.com/yurtemre7"
                class={tw`text-blue-500`}
              >
                GitHub
              </a>
            </p>

            <div class={tw`m-4`} />

            <p class={tw`text-center`}>
              <a
                href="impressum"
                class={tw`text-blue-500`}
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
      </div>
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
