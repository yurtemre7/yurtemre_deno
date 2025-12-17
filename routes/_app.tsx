import { Head } from "fresh/runtime";
import FujiBG from "../islands/FujiBg.tsx";
import { define } from "../utils.ts";

export default define.page(function App({ Component, url, state }) {
  // console.log(req.headers);
  const description =
    "Portfolio of Emre Yurtseven — mobile & web developer focusing on Flutter, TypeScript and modern front-end development.";
  return (
    <html
      lang={state.language}
      className="bg-[#141721] text-white"
    >
      <Head>
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
      </Head>
      <body className="min-h-screen">
        <FujiBG />
        <Component />
      </body>
      {/* Footer */}
      <footer className="md:py-8 p-2">
        <div className="container mx-auto px-4 flex flex-col items-center space-y-6">
          {/* Mixed Contact Links */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="mailto:yurtemre7@icloud.com"
              className="text-lg transition-colors"
            >
              {" "}yurtemre7@icloud.com
            </a>
            <a
              href="https://github.com/yurtemre7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yurtemre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://t.me/emredev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition-colors"
            >
              Telegram
            </a>
            <a
              href="/paren"
              target="_self"
              rel="noopener noreferrer"
              className="text-lg transition-colors"
            >
              Par円
            </a>
            <a
              href="/steelmouse"
              target="_self"
              rel="noopener noreferrer"
              className="text-lg transition-colors"
            >
              SteelMouse
            </a>
            <a
              href="/fasting"
              target="_self"
              rel="noopener noreferrer"
              className="text-lg transition-colors"
            >
              Fasten
            </a>
            <a
              href="https://sevven.yurtemre.de/"
              target="_self"
              rel="noopener noreferrer"
              className="text-lg transition-colors"
            >
              sevven
            </a>
          </div>
          {/* Impressum, Datenschutz, and Copyright */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <a
              href="/impressum"
              className="text-xs md:text-sm transition-colors"
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              className="text-xs md:text-sm transition-colors"
            >
              Datenschutzerklärung
            </a>
            {
              /*
            <div className="absolute bottom-0 right-0 opacity-50 md:p-8 p-2">
          <a href="https://pixabay.com/de/photos/berg-fuji-tanuki-see-571387/">
            berg-fuji-tanuki-see
          </a>
        </div> */
            }
            <a
              href="https://pixabay.com/de/photos/berg-fuji-tanuki-see-571387/"
              className="text-xs md:text-sm transition-colors"
            >
              berg-fuji-tanuki-see
            </a>
            <a
              href="https://commons.wikimedia.org/wiki/File:Istanbul_asv2021-10_img15_Y%C4%B1ld%C4%B1z_Hamidiye_Mosque.jpg#/media/Datei:Istanbul_asv2021-10_img15_Y%C4%B1ld%C4%B1z_Hamidiye_Mosque.jpg"
              className="text-xs md:text-sm transition-colors"
            >
              Hamidiye Mosque
            </a>
          </div>
          <p className="text-xs md:text-sm">
            Emre Yurtseven © 2020 - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </html>
  );
});
