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
    <div class="dark:bg-black text-center p-10 items-center">
      <head>
        <title>yurtemre.de | Impressum</title>
      </head>
      <div class="mx-auto text-center flex-row flex items-center justify-center">
        <a href="/" class="text-blue-500 flex-auto">
          <svg
            class="w-6 h-6"
            fill="none"
            width="36"
            height="36"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            >
            </path>
          </svg>
        </a>
        <div class="dark:bg-black dark:text-white text-black">
          <h1 class="text-4xl font-bold text-center">yurtemre.de</h1>
          <h2 class="text-2xl font-bold text-center">Deeplink</h2>
        </div>
        <div class="dark:text-black text-white flex-auto">
          <svg
            class="w-6 h-6"
            fill="none"
            width="36"
            height="36"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            >
            </path>
          </svg>
        </div>
      </div>

      <div class="p-5 dark:text-white h-screen mx-auto items-center justify-center flex-col flex dark:bg-black">
        <p class="text-xl font-bold">
          Ein Standort wird mit dir geteilt
        </p>
        
        <div class="m-5"></div>

        <DeeplinkButton title={pTitle} lat={pLat} long={pLong} />
      </div>
    </div>
  );
}
