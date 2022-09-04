/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function TextBox() {
  return (
    <div class={tw`dark:bg-black m-10`}>
      <div
        class={tw`h-screen text-center flex items-center justify-center`}
      >
        <div class={tw`dark:text-gray-500`}>
          <p class={tw`text-5xl font-bold hover:underline`}>
            J++, die beste Programmiersprache der Welt
          </p>
          <div class={tw`m-10`} />
          <form>
            <div
              class={tw`mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600`}
            >
              <div
                class={tw`py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800`}
              >
                <label for="comment" class="sr-only">Your comment</label>
                <textarea
                  id="comment"
                  rows={4}
                  class={tw`px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400`}
                  placeholder="Write something..."
                  required={false}
                >
                </textarea>
              </div>
              <div
                class={tw`flex justify-between items-center py-2 px-3 border-t dark:border-gray-600`}
              >
                <button
                  type="submit"
                  class={tw`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800`}
                >
                  Run Code
                </button>
                <div class={tw`flex pl-0 space-x-1 sm:pl-2`}>
                  <input id="dropzone-file" type="file" class={tw``} />
                </div>
              </div>
            </div>
          </form>
          {
            /* <div class={tw`flex justify-center items-center w-full`}>
            <label
              for="dropzone-file"
              class={tw`flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
            >
              <div
                class={tw`flex flex-col justify-center items-center pt-5 pb-6`}
              >
                <svg
                  aria-hidden="true"
                  class={tw`mb-3 w-10 h-10 text-gray-400`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  >
                  </path>
                </svg>
                <p class={tw`mb-2 text-sm text-gray-500 dark:text-gray-400`}>
                  <span class={tw`font-semibold`}>Click to upload</span>{" "}
                  or drag and drop
                </p>
                <p class={tw`text-xs text-gray-500 dark:text-gray-400`}>
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class={tw``}

                x-on:dragover="dragEventHandler(event)"
              />
            </label>
          </div> */
          }
        </div>
      </div>
    </div>
  );
}
