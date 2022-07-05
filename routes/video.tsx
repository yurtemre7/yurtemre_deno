/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps } from "$fresh/server.ts";

// is url
function isUrl(url: string) {
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    .test(url);
}

function search() {
  console.log("hi")
}

function parseSearchParams(search: string) {
  const params = new URLSearchParams(search);
  const video = params.get("q");
  return video;
}

export default function Video(props: PageProps) {
  const x = parseSearchParams(props.url.search);
  const video_url = x ||
    "https://isis.tu-berlin.de/mod/videoservice/file.php/08f046d28147c17cf5582fadec4695229f7be7fab60b832edd910b68869a5678.mp4";
  return (
    <html class={tw`dark:bg-black`}>
      <div class={tw`dark:bg-black`}>
        <form>
          <label>
            <input
              type="text"
              placeholder="https://"
              value={video_url}
              class={tw
                `dark:text-black-500 px-3 py-2 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md w-full sm:text-sm focus:ring-1`}
            />
          </label>
        </form>

        <div
          class={tw
            `dark:bg-black h-screen text-center flex items-center justify-center`}
        >
          <div class={tw`p-5`}>
            <head>
              <title>yurtemre.de | Video</title>
            </head>

            <div class={tw`m-5`} />
            {isUrl(video_url)
              ? (
                <video
                  id="yurtemre-player"
                  class={tw`mx-auto`}
                  width="50%"
                  height="50%"
                  src={video_url}
                  controls
                >
                </video>
              )
              : (
                <div class={tw`dark:text-white text-5xl`}>
                  404 - Video not found 😢
                </div>
              )}
          </div>
        </div>
      </div>
    </html>
  );
}
