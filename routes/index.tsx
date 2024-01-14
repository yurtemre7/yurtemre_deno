import NewYearCountdown from "../islands/NewYear.tsx";
import AboutMe from "../islands/about.tsx";


export default function Home() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-500">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">Selam und Willkommen bei yurtemre.de</h1>
          <p className="text-white text-2xl">Die wirklich krasseste Website auf der Erde</p>
          <div className="mt-8">
            <button className="bg-white text-blue-800 rounded shadow-lg py-2 px-4 hover:bg-blue-800 hover:text-white transition-colors duration-300"><a
              href="#contact-me"
            >
              Kontaktiere mich hier
            </a></button>
          </div>
        </div>
      </div>
      
      <div id="about-me">
        <AboutMe />
      </div>

      <div id="new-year">
        <NewYearCountdown />
      </div>

      <div id="contact-me" className="min-h-screen flex items-center justify-center bg-blue-700">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Du findest mich hier 👇</h2>
          <div className="flex justify-center mt-6">
            <a href="https://github.com/yurtemre7" className="text-white underline hover:text-blue-200 mx-4 p-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-300">GitHub</a>
            <a href="https://t.me/emredev" className="text-white underline hover:text-blue-200 mx-4 p-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-300">Telegram</a>
            <a href="mailto:yurtemre7@icloud.com" className="text-white underline hover:text-blue-200 mx-4 p-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-300">Email</a>
          </div>
        </div>
      </div>

      <footer className="bg-blue-800 text-white py-4 px-6">
        <div className="flex justify-between items-center">
          <div>
            <p>© 2020 - {new Date().getFullYear()} yurtemre.de</p>
            {/* row */}
            <div className="flex mt-1">
              <p>Made with fresh</p>
              <div class="ml-2" />
              <img
                src="/logo.svg"
                height="22px"
                width="22px"
                alt="the fresh logo: a sliced lemon dripping with juice"
              />
            </div>
          </div>
          <div>
            <a href="/impressum" className="underline hover:text-blue-200 mr-4">Impressum</a>
            <a href="/datenschutz" className="underline hover:text-blue-200">Datenschutz</a>
          </div>
        </div>
      </footer>
    </>
  );
}