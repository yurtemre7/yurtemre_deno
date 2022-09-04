/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Divider from "../components/Divider.tsx";
import MyFooter from "../components/MyFooter.tsx";
import TextBox from "../components/TextBox.tsx";
import { domSheet } from "https://esm.sh/v86/twind@0.16.17/sheets/sheets.d.ts";

interface InitialData {
  name: string;
}

export const handler: Handlers<InitialData> = {
  GET(_req, ctx) {
    const data: InitialData = {
      name: "Joshua",
    };
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps<InitialData>) {

  return (
    <html class={tw`dark:bg-black h-full w-full`}>
      <div class={tw`dark:bg-black h-full w-full`}>
        <head>
          <title>yurtemre.de | GVM by DeveloperX19</title>
        </head>

        <TextBox />

        <Divider />

        <MyFooter />
      </div>
    </html>
  );
}
