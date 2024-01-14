import { type PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>yurtemre.de</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <body>
        <Component />
      </body>
    </html>
  );
}
