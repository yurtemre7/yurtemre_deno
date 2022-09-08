import { tw } from "twind";
import { useState } from "preact/hooks";

interface InitialData {
  code: string;
  output: string;
  input: string;
}

export default function TextBox({ code, output, input }: InitialData) {
  const [codeText, setCodeText] = useState(code);
  const [outputText, setOutputText] = useState(output);
  const [inputText, setInputText] = useState(input);

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
                <label class={tw`text-white`}>Input</label>

                <div
                  class={tw`flex-auto py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800`}
                >
                  <textarea
                    name="input"
                    rows={20}
                    scrolling={"yes"}
                    style="font-size: 1.5rem; line-height: 2rem; min-width: 20vw;"
                    class={tw`resize-x px-0 w-full text-5xl text-sm text-white bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400`}
                    placeholder={' "Reverse" 81238 '}
                    required={false}
                    value={inputText}
                  />
                </div>
              </div>

              <div class={tw`mx-5`}></div>

              {/* Input 2 */}
              <div
                class={tw`flex-auto px-4 pb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600`}
              >
                <label class={tw`text-white`}>Assembly</label>
                <div
                  class={tw`py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800`}
                >
                  <textarea
                    name="assembly"
                    rows={20}
                    scrolling={"yes"}
                    style="font-size: 1.5rem; line-height: 2rem; min-width: 40vw;"
                    class={tw`resize-x px-0 w-full text-5xl text-sm text-white bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400`}
                    placeholder={":main" + "\n" + "jmp main"}
                    required={false}
                    value={codeText}
                  />
                </div>
              </div>
            </div>

            <div class={tw`m-4`} />

            <div
              class={tw`w-full flex flex-row items-center content-between`}
            >
              <div class={tw`flex-auto space-x-1 sm:pl-2`}>
                <label
                  class={tw`text-white`}
                >
                  Input file
                </label>
                <input
                  id="dropzone-file"
                  name="ifile"
                  type="file"
                  class={tw``}
                  onChange={(e) => {
                    console.log("Changed input");

                    // get the file object
                    const htmlInputElem = e.target as HTMLInputElement;

                    const fileList = htmlInputElem.files;
                    if (fileList && fileList.length > 0) {
                      const file = fileList[0];
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const text = ev.target?.result as string;
                        setInputText(text);
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
              </div>
              <div class={tw`flex-auto space-x-1 sm:pl-2`}>
                <label class={tw`text-white`}>Assembly file</label>
                <input
                  id="dropzone-file"
                  name="afile"
                  type="file"
                  class={tw``}
                  onChange={(e) => {
                    console.log("Changed assembly");

                    // get the file object
                    const htmlInputElem = e.target as HTMLInputElement;

                    const fileList = htmlInputElem.files;
                    if (fileList && fileList.length > 0) {
                      const file = fileList[0];
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        const text = ev.target?.result as string;
                        setCodeText(text);
                      };
                      reader.readAsText(file);
                    }
                  }}
                />
              </div>
            </div>
            <div class={tw`m-4`} />
            <button
              type="submit"
              class={tw`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800`}
            >
              Run Code
            </button>
            <div class={tw`m-4`} />
            {outputText.length > 0
              ? (
                <div
                  class={tw`flex-auto w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600`}
                >
                  <label class={tw`text-white`}>Output</label>
                  <div
                    class={tw`flex-auto py-4 px-4 bg-white rounded-t-lg dark:bg-gray-800`}
                  >
                    <div class={tw`m-2`}></div>
                    <p
                      style="font-size: 1.5rem; line-height: 2rem; max-width: 80vw;"
                      class={tw`px-0 w-full text-5xl text-sm text-white bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400`}
                    >
                      {outputText}
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
