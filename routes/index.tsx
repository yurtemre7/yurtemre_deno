import Snowfall from "../islands/snowfall.tsx";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-4xl w-full mx-4 sm:mx-6 lg:mx-12 my-4 sm:my-6 p-6 sm:p-8 md:p-10 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        {/* Header with Name and Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 md:mb-8">
          <div>
            <h1 className="text-3xl sm:text-2xl md:text-4xl font-semibold mb-1">Emre Yurtseven</h1>
            <p className="text-lg sm:text-base md:text-xl font-medium">App Developer</p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
            Born on January 16, 2002 • B.Sc. Computer Science
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Experience Section */}
          <div className="flex-1 space-y-3">
            <h2 className="text-xl sm:text-lg md:text-2xl font-semibold mb-2">Experience</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Junior Frontend Developer, DEIN ERSTER TAG, June 2023 - Present</li>
              <li>Junior Frontend Developer, Appmelder, April 2021 - December 2022</li>
            </ul>
          </div>

          {/* Projects Section */}
          <div className="flex-1 space-y-3">
            <h2 className="text-xl sm:text-lg md:text-2xl font-semibold mb-2">Projects</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 overflow-x-auto">
              <li>
                <a href="https://github.com/yurtemre7/woauto" className="text-blue-500">
                  WoAuto
                </a> - Never lose sight of your car parking ever again.
              </li>
              <li>
                <a href="/paren" className="text-blue-500">
                  Paren
                </a> - Enjoy your vacation and keep the local currency ready at your fingertips.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer with Contact Info */}
        <footer className="pt-8 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between items-center md:items-center space-y-4 sm:space-y-0 md:space-x-4">
          {/* Contact Info */}
          <div className="space-y-1 text-center md:text-left">
            <p><strong>Email:</strong> <a href="mailto:yurtemre7@icloud.com" className="text-blue-500">yurtemre7@icloud.com</a></p>
            <p><strong>Telegram:</strong> <a href="https://t.me/emredev" className="text-blue-500">@emredev</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/yurtemre7" className="text-blue-500">github.com/yurtemre7</a></p>
          </div>

          {/* Copyright and Legal Links */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-right">
            <p>© 2020 - {new Date().getFullYear()} Emre Yurtseven</p>
            <a href="/impressum" className="text-blue-500 hover:underline">Impressum</a>
            <a href="/datenschutz" className="text-blue-500 hover:underline">Datenschutzerklärung</a>
          </div>
        </footer>
      </div>

      {/* Snowfall Component */}
      <Snowfall />
    </div>
  );
};