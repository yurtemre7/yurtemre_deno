/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Divider from "../components/Divider.tsx";
import MyFooter from "../components/MyFooter.tsx";
import { domSheet } from "https://esm.sh/v86/twind@0.16.17/sheets/sheets.d.ts";
import { exec } from "https://deno.land/x/exec@0.0.5/mod.ts";
import TextBox from "../islands/TextBox.tsx";
interface InitialData {
  code: string;
}

let savedCode = "";
let output = "";
let inputCode = "";

export const handler: Handlers<InitialData> = {
  GET(_req, ctx) {
    const data: InitialData = {
      code: savedCode,
    };
    return ctx.render(data);
  },

  async POST(_req, ctx) {
    const formData = await _req.formData();
    const ifile = formData.get("ifile") as File;
    const afile = formData.get("afile") as File;
    const input = formData.get("input") as string;
    const code = formData.get("code") as string;

    if (ifile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        inputCode = "" + fileReader.result;
      };
      // fileReader.readAsText(ifile, "UTF-8");
    }

    if (afile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        savedCode = "" + fileReader.result;
      };
      // fileReader.readAsText(afile, "UTF-8");
    }

    savedCode = code;
    inputCode = input;

    if (code) {
      console.log("Code:\n" + code);
    }
    if (ifile) {
      console.log("Datei (input):\n" + ifile);
    }
    if (afile) {
      console.log("Datei (assembly):\n" + afile);
    }
    console.log("Extrahierter Code:\n" + savedCode);

    let succeed = false;

    if (savedCode.length > 0) {
      // execute shell on server
      const p = Deno.run({
        // cmd: ["cmd", "/c", "echo", "Hello World"], windows
        cmd: ["echo", savedCode, input], // linux
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
