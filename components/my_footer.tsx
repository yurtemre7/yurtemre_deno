export default function MyFooter() {
    return (
        <footer className="bg-blue-800 text-white py-4 px-6 md:flex md:justify-between flex-col">
            <div className="md:justify-between md:flex md:items-center flex-col md:flex-row">
                <div className="text-center md:text-left">
                    <p>© 2020 - {new Date().getFullYear()} <a className="hover:underline" href="/">yurtemre.de</a></p>
                    <div className="flex justify-center md:justify-start mt-1">
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
                <div className="mt-4 md:mt-0 text-center md:text-right">
                    <a href="/fasting" className="hover:underline hover:text-blue-200 mr-4">Fasting</a>
                    <a href="/impressum" className="hover:underline hover:text-blue-200 mr-4">Impressum</a>
                    <a href="/datenschutz" className="hover:underline hover:text-blue-200">Datenschutz</a>
                </div>
            </div>
        </footer>
    )
}