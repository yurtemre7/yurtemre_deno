/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function About() {
  const diff = new Date().getTime() - new Date("2020-10-01").getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const semester = Math.ceil(days / 30 / 6);
  
  return (
    <div class={tw`dark:bg-black`}>
      <div
        class={tw`h-screen text-center flex items-center justify-center`}
      >
        <div class={tw`dark:text-gray-500`}>
          <p class={tw`text-5xl font-bold hover:underline`}>
            Wer ist'n das? 🤷‍♂️
          </p>
          <div class={tw`m-10`} />
          <p class={tw`text-xl`}>
            Emre ist ein Informatik Student im {semester}. Semester an der{"  "}
            <a
              class={tw`text-blue-500 hover:underline`}
              href="https://www.tu.berlin/"
            >
              TU Berlin
            </a>{" "}
            und arbeitet in der Cross-Platform App-Entwicklung mit{"  "}
            <a
              class={tw`text-blue-500 hover:underline`}
              href="https://flutter.dev"
            >
              Flutter
            </a>{" "}
            am{" "}
            <a
              class={tw`text-blue-500 hover:underline`}
              href="https://www.appmelder.de"
            >
              Appmelder
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
