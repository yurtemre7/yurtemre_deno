import { AppProps } from "$fresh/server.ts";

export default function App({ Component, state }: AppProps) {
  // do something with state here
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>yurtemre.de</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}