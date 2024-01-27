import re from "https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs";

class MyLlama {
  constructor() {
    console.log("MyLlama was created!");
  }

  async generateMsg(prompt: string) : Promise<string | null> {
    await fetch("https://server.yurtemre.de:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama2:7b",
        prompt: prompt,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return 'An error occured.'
        }
        if (response.status !== 200) {
          return 'An error occured. Status code: ' + response.status
        }
        if (!response.body) {
            return 'An error occured. No response body.'
        }
        const reader = response.body!.getReader();
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(new TextDecoder().decode(value));
                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) => {
        return new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text();
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        console.error("Error:", error);
        return null;
      });

      return new Promise((resolve, reject) => {
        resolve("An error occured. Please try again later.");
      });
  }
}

let myLlama = new MyLlama();

export default myLlama;
