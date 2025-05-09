import { type PageProps } from "$fresh/server.ts";

export default function App(props: PageProps) {
  return (
    <html lang={props.data?.lang ?? 'en'} className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="description" content="Portfolio website of Emre Yurtseven, the most krass app developer." />

        <title>{props.url.host}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <props.Component />
      </body>
    </html>
  );
}
