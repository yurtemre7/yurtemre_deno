/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Divider from "../components/Divider.tsx";
import MyFooter from "../components/MyFooter.tsx";
import TextBox from "../components/TextBox.tsx";
import { domSheet } from "https://esm.sh/v86/twind@0.16.17/sheets/sheets.d.ts";
import { exec } from "https://deno.land/x/exec@0.0.5/mod.ts";
interface InitialData {
  code: string;
}

let savedCode = "";
let output = "";
let inputCode = "";

export const handler: Handlers<InitialData> = {
  GET(_req, ctx) {
    const data: InitialData = {
      code: "",
    };
    return ctx.render(data);
  },

  async POST(_req, ctx) {
    const formData = await _req.formData();
    const file = formData.get("file") as File;
    const input = formData.get("input") as string;
    const code = formData.get("code") as string;

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        savedCode = "" + fileReader.result;
      };
      // fileReader.readAsText(file, "UTF-8");
    } else if (code) {
      savedCode = code;
    }
    inputCode = input;

    if (code) {
      console.log("Code:\n" + code);
    }
    if (file) {
      console.log("Datei:\n" + file);
    }
    console.log("Extrahierter Code:\n" + savedCode);

    let succeed = false;

    if (savedCode.length > 0) {
      // execute shell on server
      const p = Deno.run({
        cmd: ["cmd", "/c", "echo", savedCode, input],
        stdout: "piped",
      });

      setTimeout(() => {
        // if process is still running, kill it
        if (!succeed) {
          p.kill("SIGTERM");
        }
      }, 1000 * 8);

      const stdout = await p.output();
      succeed = true;

      p.close();
      const txt = new TextDecoder().decode(stdout);
      console.log("result", txt);

      output = txt;
    }

    const data: InitialData = {
      code: savedCode,
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

        <TextBox code={data.code} output={output} input={inputCode} />

        <Divider />

        <MyFooter />
      </div>
    </html>
  );
}
