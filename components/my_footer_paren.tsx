export default function MyFooterParen() {
  return (
    <footer className="bg-orange-600 text-white py-4 px-6 md:flex md:justify-between flex-col">
      <div className="md:justify-between md:flex md:items-center flex-col md:flex-row">
        <div className="text-center md:text-left">
          <p>
            © 2020 - {new Date().getFullYear()}{" "}
            <a className="hover:underline" href="/">yurtemre.de</a>
          </p>
          <div className="flex justify-center md:justify-start mt-1">
            <p>Made with</p>
            <div className="ml-1" />
            <a
              href="https://fresh.deno.dev/"
              className="hover:underline flex flex-row"
            >
              <div>
                fresh
              </div>
              <div className="ml-1" />
              <img
                src="/logo.svg"
                height="22px"
                width="22px"
                alt="the fresh logo: a sliced lemon dripping with juice"
              />
            </a>
            <div className="ml-1" />
          </div>
        </div>
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <a href="/fasting" className="hover:underline mr-4">Fasting</a>
          <a href="/impressum" className="hover:underline mr-4">Impressum</a>
          <a href="/datenschutz" className="hover:underline">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}
