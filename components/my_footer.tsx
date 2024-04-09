export default function MyFooter() {
    return (
        <footer className="bg-blue-800 text-white py-4 px-6">
            <div className="flex justify-between items-center">
                <div>
                    <p>© 2020 - {new Date().getFullYear()} <a className="hover:underline" href="/">yurtemre.de</a></p>
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
                    <a href="/impressum" className="hover:underline hover:text-blue-200 mr-4">Impressum</a>
                    <a href="/datenschutz" className="hover:underline hover:text-blue-200">Datenschutz</a>
                </div>
            </div>
        </footer>
    )
}