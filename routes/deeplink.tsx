import { PageProps } from "$fresh/server.ts";
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
    <html className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <div className="text-center p-10 items-center">
        <head>
          <title>yurtemre.de | Deeplink</title>
        </head>

        <h2 className="text-2xl font-bold text-center">Deeplink</h2>
        <div className="p-5 h-screen mx-auto items-center justify-center flex-col flex">
          <p className="text-xl font-bold">
            Ein Standort mit dem Titel {pTitle} wird mit dir geteilt:
          </p>

          <div className="m-5"></div>

          <DeeplinkButton title={pTitle} lat={pLat} long={pLong} />
        </div>
      </div>
    </html>
  );
}