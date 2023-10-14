import { Handlers, PageProps } from "$fresh/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import MyFooter from "../components/MyFooter.tsx";

const helloweenEventSoulsCountApi = "https://www.elsrift.to/api/v1/ixc/019b8cad0d0cbcd8879a2e595d9fd4fa0942ca87963e07e533832aedba269cca68bf36c0ead7e51b9ef5164089eeb4ffede7b3e41e33ff0513918d3d8e77149fe9118b030c57540dcd2ce58abd393b3d5cfcdd8626618477476e"

interface ElswordData {
  count: number;
  date: string;
}

export const handler: Handlers<ElswordData> = {
  async GET(_, ctx) {
    const resp = await fetch(helloweenEventSoulsCountApi);

    const json = await resp.json();

    if (!json) {
      return ctx.render();
    }

    console.log(json);

    const elsData = {
      count: json.count,
      date: json.date,
    };

    return ctx.render(elsData);
  },
};

export default function Home(props: PageProps<ElswordData>) {
  // console.log(props.data);
  // convert the number count to human readable string with . to separate thousands
  const count = props.data.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <html class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <div class="h-screen text-center flex items-center justify-center">

        <h2 class="text-3xl font-bold text-center mt-10">Elsrift Souls Count</h2>
        <div class="grid grid-cols-1 gap-16 m-16">
            <div class="text-center">
                <p class="text-4xl font-bold text-center mt-10">{count} Seelen</p>
                <p class="text font-bold text-center mt-10">Stand: {props.data.date}</p>
            </div>
        </div>
      </div>
      <MyFooter/>
    </html>
  );
}
