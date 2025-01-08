export default function MyFooter() {
    return (
        <footer className="py-4 px-6 md:flex md:justify-between flex-col">
            <div className="md:justify-between md:flex md:items-center flex-col md:flex-row">
                <div className="text-center md:text-left">
                    <p>© 2020 - {new Date().getFullYear()} <a className="hover:underline" href="/">yurtemre.de</a></p>
                    <div className="flex justify-center md:justify-start mt-1">
                        <p>Made with</p>
                        <div className="ml-1" />
                        <a href="https://fresh.deno.dev/" className="hover:underline flex flex-row hover:text-blue-200">
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
                    <a href="/impressum" className="hover:underline hover:text-blue-200 mr-4">Impressum</a>
                    <a href="/datenschutz" className="hover:underline hover:text-blue-200">Datenschutz</a>
                </div>
            </div>
        </footer>
    )
}