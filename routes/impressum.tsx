/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Impressum() {
  return (
    <div class={tw`dark:bg-black h-screen text-center flex items-center justify-center`}>
      <div class={tw`p-5 dark:text-white`}>
        <head>
          <title>yurtemre.de | Impressum</title>
        </head>
        <p class={tw`text-left text-2xl font-bold`}>
          IMPRESSUM
        </p>
        <div class={tw`m-4`} />
        <p class={tw`text-left text-xl font-bold`}>
          Angaben gemäß § 5 TMG
        </p>
        <p class={tw`text-left`}>
          Emre Yurtseven
        </p>
        <p class={tw`text-left`}>
          Gradestraße 30, <br /> 12347 Berlin, Deutschland
        </p>
        <div class={tw`m-4`} />
        <p class={tw`text-left text-xl font-bold`}>
          Kontakt
        </p>
        <p class={tw`text-left`}>
          Telefon: +49 177 921 43 52
        </p>
        <p class={tw`text-left`}>
          E-Mail:
          <a href="mailto:emreyurtseven18@gmail.com">
            {" emreyurtseven18@gmail.com"}
          </a>
        </p>
      </div>
    </div>
  );
}
