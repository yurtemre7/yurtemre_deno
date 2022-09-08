import { tw } from "twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Divider from "../components/Divider.tsx";
import MyFooter from "../components/MyFooter.tsx";
import TextBox from "../islands/TextBox.tsx";
interface InitialData {
  code: string;
  output: string;
  input: string;
}

export const handler: Handlers<InitialData> = {
  GET(_req, ctx) {
    const data: InitialData = {
      code: "",
      output: "",
      input: "",
    };
    return ctx.render(data);
  },

  async POST(_req, ctx) {
    const formData = await _req.formData();
    const input = formData.get("input") as string;
    const assembly = formData.get("assembly") as string;
    let result = "";

    let succeed = false;

    if (assembly.length > 0) {
      // execute shell on server
      const p = Deno.run({
        // cmd: ["cmd", "/c", "EML", assembly], // windows
        cmd: ["echo", assembly, input], // linux
        // cmd: ["gvm", "j++", "otf", assembly, input], // joshua = bottleneck
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
      // console.log("result", txt);

      result = txt;
    }

    const data: InitialData = {
      code: assembly,
      output: result,
      input: input,
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

        <TextBox code={data.code} output={data.output} input={data.input} />

        <Divider />

        <MyFooter />
      </div>
    </html>
  );
}
