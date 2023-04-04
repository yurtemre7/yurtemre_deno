import { PageProps } from "$fresh/server.ts";
import MyFooter from "../components/MyFooter.tsx";
import DeeplinkButton from "../islands/DeeplinkButton.tsx";

export default function Deeplink(props: PageProps) {
  const params = props.url.searchParams;
  const pTitle = params.get("title") || "Anderer Parkplatz";
  const pLat = params.get("lat");
  const pLong = params.get("long");

  if (!pLat || !pLong) {
    return <div>Ohne Koordinaten geht es nicht</div>;
  }

  return (
    <html class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <div class="text-center p-10 items-center">
        <head>
          <title>yurtemre.de | Deeplink</title>
        </head>

        <h2 class="text-2xl font-bold text-center">Deeplink</h2>
        <div class="p-5 h-screen mx-auto items-center justify-center flex-col flex">
          <p class="text-xl font-bold">
            Ein Standort mit dem Titel {pTitle} wird mit dir geteilt:
          </p>

          <div class="m-5"></div>

          <DeeplinkButton title={pTitle} lat={pLat} long={pLong} />
        </div>
      </div>
      <MyFooter />
    </html>
  );
}
