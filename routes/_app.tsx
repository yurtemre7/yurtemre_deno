import { type PageProps } from "$fresh/server.ts";

export default function App(props: PageProps) {
  return (
    <html
      lang={props.data?.lang ?? "en"}
      className="dark bg-gray-900 text-gray-100 antialiased transition-colors duration-200"
    >
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="description"
          content="Portfolio website of Emre Yurtseven, the most krass app developer."
        />

        <title>{props.url.host}</title>
        <meta name="theme-color" content="#121212" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className="min-h-screen bg-gray-800 text-gray-100 antialiased">
        <props.Component />
      </body>
    </html>
  );
}
