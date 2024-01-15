import NewYearCountdown from "../islands/NewYear.tsx";
import AboutMe from "../islands/about.tsx";


export default function Home() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-500">
        <div className="text-center pb-8 pt-8">
          <h1 className="text-6xl font-bold text-white mb-4">yurtemre.de</h1>
          <blockquote className="text-white text-xl italic font-semibold">
            <p>"Die wirklich krasseste Website der Erde"</p>
          </blockquote>
          <p className="text-white text-2xl"></p>
          <div className="mt-12">
            <button className="bg-white text-blue-800 rounded shadow-lg py-2 px-4 hover:bg-blue-800 hover:text-white transition-colors duration-300"><a
              href="#contact-me"
            >
              Kontaktiere mich hier
            </a></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-800">
        <figure className="items-center justify-center py-4 bg-blue-800 text-white">
          <svg className="w-10 h-10 mx-auto mb-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium  text-center text-white">"zzZ... zzZ... zzZ..."</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-400">
              <cite className="pe-3 font-medium text-white">Teoman W.</cite>
              <cite className="ps-3 text-sm text-white">Informatik Student</cite>
            </div>
          </figcaption>
        </figure>
        <figure className="items-center justify-center py-4 bg-blue-800 text-white">
          <svg className="w-10 h-10 mx-auto mb-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-center text-white">"Sieht gut aus für'n Anfänger."</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-400">
              <cite className="pe-3 font-medium text-white">Jason C.</cite>
              <cite className="ps-3 text-sm text-white">Elektrotechnik Student</cite>
            </div>
          </figcaption>
        </figure>
        <figure className="items-center justify-center py-4 bg-blue-800 text-white">
          <svg className="w-10 h-10 mx-auto mb-3 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
          </svg>
          <blockquote>
            <p className="text-2xl italic font-medium text-centertext-white">"iiiiiiieeeeeehhh Javascript !!!"</p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-400">
              <cite className="pe-3 font-medium text-white">Joshua S.</cite>
              <cite className="ps-3 text-sm text-white">Developer of J.dev, Ex-developer of SNP👍🏼</cite>
            </div>
          </figcaption>
        </figure>
      </div>



      <div id="about-me" className="pt-8 pb-8 bg-blue-600 text-white">
        <AboutMe />
      </div>

      <div id="new-year">
        <NewYearCountdown />
      </div>

      <div id="contact-me" className="min-h-screen flex items-center justify-center bg-blue-700">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Du findest mich hier 👇</h2>
          <div className="flex justify-center mt-6">
            <a href="https://t.me/emredev" className="text-white underline hover:text-blue-200 mx-4 p-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-300">Telegram</a>
            <a href="mailto:info@yurtemre.de" className="text-white underline hover:text-blue-200 mx-4 p-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-300">Email</a>
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
              <div className="ml-2" />
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