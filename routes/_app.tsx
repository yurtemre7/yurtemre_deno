import { define } from "../utils.ts";

export default define.page(function App({ Component, url, state }) {
  // console.log(req.headers);
  const description =
    "Portfolio of Emre Yurtseven — mobile & web developer focusing on Flutter, TypeScript and modern front-end development.";
  return (
    <html
      lang={state.language}
      className="bg-[#0A0F1E] text-[#E2E8F0]"
    >
      <head>
        {/* Character encoding should be first */}
        <meta charset="utf-8" />

        {/* Viewport and mobile settings */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Title and description for SEO */}
        <title>{url.host}</title>
        <meta name="description" content={description} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Theme and other meta */}
        <meta name="theme-color" content="#121212" />
      </head>
      <body className="min-h-screen">
        <Component />
      </body>
    </html>
  );
});
