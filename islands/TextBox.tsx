import { useState } from "preact/hooks";

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

export default function TextBox({ code, output, input }: InitialData) {
  const [codeText, setCodeText] = useState(code);
  const [outputText, _] = useState(output);
  const [inputText, setInputText] = useState(input);

  function stringToHTMLWithLineBreaks(str: string) {
    return (
      <div>
        {str.split("\n").map((item, key) => {
          return (
            <span key={key}>
              {item}
              <br />
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div class="m-10">
      <div class="text-center flex-col flex items-center justify-center">
        <div class="flex flex-wrap items-center content-between">
          <form
            method="POST"
            class="flex flex-col items-center"
          >
            <div class="flex flex-wrap items-center content-between">
              {/* Input 1 */}
              <div class="flex-auto px-4 pb-4 rounded-lg border bg-gray-700 border-gray-600">
                <label class="text-white">Input</label>

                <div class="flex-auto py-2 px-4 rounded-t-lg bg-gray-800">
                  <textarea
                    name="input"
                    rows={20}
                    scrolling={"yes"}
                    style="font-size: 1.5rem; line-height: 2rem; min-width: 20vw;"
                    class="resize-y px-0 text-sm text-white border-0 bg-gray-800 focus:ring-0 placeholder-gray-400"
                    placeholder={exampleInput1}
                    required={false}
                    value={inputText}
                  />
                </div>
              </div>

              <div class="mx-5"></div>

              {/* Input 2 */}
              <div class="flex-auto px-4 pb-4 rounded-lg border bg-gray-700 border-gray-600">
                <label class="text-white">Assembly</label>
                <div class="py-2 px-4 rounded-t-lg bg-gray-800">
                  <textarea
                    name="assembly"
                    rows={20}
                    scrolling={"yes"}
                    style="font-size: 1.5rem; line-height: 2rem; min-width: 40vw;"
                    class="resize-y px-0 text-5xl text-sm text-white border-0 bg-gray-800 focus:ring-0 placeholder-gray-400"
                    placeholder={exampleCode1}
                    required={false}
                    value={codeText}
                  />
                </div>
              </div>
            </div>

            <div class="m-4" />

            <div class="flex flex-wrap items-center content-between">
              <div class="flex-auto space-x-1 sm:pl-2">
                <label class="">
                  Input file
                </label>
                <input
                  id="dropzone-file"
                  name="ifile"
                  type="file"
                  class=""
                  onChange={(e) => {
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
              <div class="flex-auto space-x-1 sm:pl-2">
                <label class="">Assembly file</label>
                <input
                  id="dropzone-file"
                  name="afile"
                  type="file"
                  class=""
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
            <div class="m-4" />
            <button
              type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              Run Code
            </button>
          </form>
        </div>
      </div>
      <div class="m-4" />
      <div class="mx-auto text-center flex-col flex items-center justify-center">
        {outputText.length > 0
          ? (
            <div class="flex-auto rounded-lg border bg-gray-700 border-gray-600">
              <label class="text-white">Output</label>
              <div class="flex-auto py-4 px-4 rounded-t-lg bg-gray-800">
                <div class="m-2"></div>
                <div
                  style="font-size: 1.5rem; line-height: 2rem;"
                  class="px-0 text-sm text-white border-0 bg-gray-800"
                >
                  {stringToHTMLWithLineBreaks(outputText)}
                </div>
                <div class="m-2"></div>
              </div>
            </div>
          )
          : ""}
      </div>
    </div>
  );
}
