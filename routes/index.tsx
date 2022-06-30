/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import About from "../islands/About.tsx";
import Divider from "../islands/Divider.tsx";
import MyFooter from "../islands/MyFooter.tsx";
import Welcome from "../islands/Welcome.tsx";

export default function Home() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC

  return (
    <html class={tw`dark:bg-black h-full w-full`}>
      <div class={tw`dark:bg-black h-full w-full`}>
        <head>
          <title>yurtemre.de</title>
        </head>

        

        <Divider />

        <About />

        <MyFooter />
      </div>
    </html>
  );
}
