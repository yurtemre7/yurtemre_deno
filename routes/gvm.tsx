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

    if (assembly.length > 0) {
      const body = new FormData();
      body.append("assembly", assembly);
      body.append("input", input);
      try {
        const res = await fetch("http://server.yurtemre.de:6060/gvm", {
          method: "POST",
          body,
        }).catch((err) => {
          console.log(err);
          result = "Error: " + err;
          return err;
        });
        // check if res is of type Response
        if (res instanceof Response) {
          result = await res.text();
        }
      } catch (error) {
        result = "Error: " + error;
      }
    }

    console.log(result);

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
