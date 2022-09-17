import { Handlers, PageProps } from "$fresh/server.ts";
import Divider from "../components/Divider.tsx";
import MyFooter from "../components/MyFooter.tsx";
import TextBox from "../islands/TextBox.tsx";
interface InitialData {
  code: string;
  output: string;
  input: string;
}

const exampleCode1 = "# inp = tx0\n" +
  "# size = ti0\n" +
  "# tmp = tr0\n" +
  "# iter = ti1\n" +
  "jmp mainloop\n" +
  "\n" +
  "// write the result of (tmp * tmp) to tmp\n" +
  ": square\n" +
  "muli tmp tmp tmp\n" +
  "ret\n" +
  "\n" +
  ": mainloop\n" +
  "mov tmp inp[iter]\n" +
  "call square\n" +
  "mov inp[iter] tmp\n" +
  "addi iter 1 iter\n" +
  "lti iter size tmp\n" +
  "cjmp mainloop tmp\n" +
  "ret\n";

const exampleInput1 = "2 -4 9\n132\n100";

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
    let input = formData.get("input") as string;
    let assembly = formData.get("assembly") as string;
    let result = "";
    console.log("input: ", input);
    console.log("assembly: ", assembly);

    if (assembly.length == 0 && input.length == 0) {
      assembly = exampleCode1;
      input = exampleInput1;
    }

    try {
      const res = await fetch("http://server.yurtemre.de:6060/gvm", {
        method: "POST",
        body: JSON.stringify({
          input: input,
          assembly: assembly,
        }),
      }).catch((err) => {
        console.log(err);
        result = "Error: " + err;
        return err;
      });
      console.log(res);
      // check if res is of type Response
      if (res instanceof Response) {
        result = await res.text();
      }
    } catch (error) {
      result = "Error: " + error;
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
    <html class="dark:bg-black h-full w-full">
      <div class="dark:bg-black h-full w-full">
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
