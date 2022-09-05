/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

interface InitialData {
  code: string;
  output: string;
  input: string;
}

export default function TextBox({ code, output, input }: InitialData) {
  return (
    <div class={tw`dark:bg-black m-10`}>
      <div class={tw`flex flex-row items-center content-between`}>
        <a href="/" class={tw`text-blue-500 flex-auto`}>
          <svg
            class={tw`w-6 h-6`}
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
        <div class={tw`dark:bg-black text-white`}>
          <h1 class={tw`text-4xl font-bold text-center`}>GVM</h1>
          <h2 class={tw`text-2xl font-bold text-center`}>by DeveloperX19</h2>
        </div>
        <div class={tw`text-black flex-auto`}>
          <svg
            class={tw`w-6 h-6`}
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

      <div
        class={tw`h-screen text-center flex-col flex items-center justify-center dark:text-gray-500`}
      >
        <div
          class={tw`flex flex-row items-center content-between`}
        >
          <form
            method="POST"
            class={tw`flex flex-col items-center`}
          >
            <div class={tw`flex flex-row items-center content-between`}>
              {/* Input 1 */}
              <div
                class={tw`flex-auto px-4 pb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600`}
              >
                <label class={tw``}>Input</label>

                <div
                  class={tw`flex-auto py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800`}
                >
                  <textarea
                    name="input"
                    rows={20}
                    scrolling={"yes"}
                    style="font-size: 1.5rem; line-height: 2rem;"
                    class={tw`resize-none px-0 w-full text-5xl text-sm text-white bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400`}
                    placeholder={"1 2 3\n4 5 9\n7 8 15"}
                    required={false}
                    value={input}
                  />
                </div>
              </div>

              <div class={tw`mx-10`}></div>

              {/* Input 2 */}
              <div
                class={tw`flex-auto px-4 pb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600`}
              >
                <label class={tw`text-white`}>Assembly</label>
                <div
                  class={tw`py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800`}
                >
                  <textarea
                    name="code"
                    rows={20}
                    scrolling={"yes"}
                    style="font-size: 1.5rem; line-height: 2rem;"
                    class={tw`resize-none px-0 w-full text-5xl text-sm text-white bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400`}
                    placeholder={":main" + "\n" + "jmp main"}
                    required={false}
                    value={code}
                  />
                </div>
              </div>
            </div>

            <div class={tw`m-2`} />

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
                <input
                  id="dropzone-file"
                  name="file"
                  type="file"
                  class={tw``}
                />
              </div>
            </div>
            {output.length > 0
              ? (
                <div
                  class={tw`flex-auto w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600`}
                >
                  <label class={tw``}>Output</label>
                  <div
                    class={tw`flex-auto py-4 px-4 bg-white rounded-t-lg dark:bg-gray-800`}
                  >
                    <div class={tw`m-2`}></div>
                    <p
                      style="font-size: 1.5rem;"
                      class={tw`px-0 w-full text-5xl text-sm text-white bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400`}
                    >
                      {output}
                    </p>
                    <div class={tw`m-2`}></div>
                  </div>
                </div>
              )
              : ""}
          </form>
        </div>
      </div>
    </div>
  );
}
