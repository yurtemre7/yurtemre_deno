/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Impressum() {
  return (
    <div
      class={tw`dark:bg-black h-screen text-center flex items-center`}
    >
      <head>
        <title>yurtemre.de | Impressum</title>
      </head>
      <div class={tw`flex-1 text-white`}>
        <h1 class={tw`text-3xl`}>Impressum</h1>
        <p class={tw`text-lg`}>
          <p>yurtemre.de</p>
          <br />
        </p>
      </div>

      <div class={tw`p-5 dark:text-white flex-1`}>
        <p class={tw`text-xl font-bold`}>
          Angaben gemäß § 5 TMG
        </p>
        <p>
          Emre Yurtseven
        </p>
        <p>
          Gradestraße 30, <br /> 12347 Berlin, Deutschland
        </p>
        <div class={tw`m-4`} />
        <p class={tw`text-xl font-bold`}>
          Kontakt
        </p>
        <p>
          Telefon: +49 177 921 43 52
        </p>
        <p>
          E-Mail:
          <a href="mailto:emreyurtseven18@gmail.com">
            {" emreyurtseven18@gmail.com"}
          </a>
        </p>
      </div>
    </div>
  );
}
