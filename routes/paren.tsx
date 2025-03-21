//import DateCountdown from "../islands/DateCountdown.tsx";
import ParenFlutter from "../islands/paren_flutter.tsx";
import MyFooterParen from "../components/my_footer_paren.tsx";
import CountdownClock from "../islands/CountdownClock.tsx";

const parenAppleDownloadURL = "https://apps.apple.com/us/app/paren/id6578395712";
const parenGoogleDownloadURL = "https://play.google.com/store/apps/details?id=de.emredev.paren";

export default function Paren() {
    const vacationJapan = new Date(2024, 8, 27, 13, 10);
    return (
        <html className="bg-orange-600">
            <body>
                <nav className="bg-gradient-to-r from-orange-400 to-orange-800 p-4 shadow-lg">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-bold hover:underline">← yurtemre.de</a>
                        <h2 className="text-white font-bold text-center">Paren 円</h2>
                    </div>
                </nav>
                <div className="min-h-screen flex sm:flex-row flex-col items-center justify-center bg-orange-600">
                    <ParenFlutter />
                    <div className="text-center items-center w-1/2 my-10">
                        <h2 className="text-4xl font-bold text-white mb-8">Download Par円👇</h2>
                        <div className="flex justify-center sm:flex-row flex-col m-8">
                            <a href={parenAppleDownloadURL}>
                                <img
                                    width={215}
                                    height={75}
                                    src="/appstore_dl.svg"
                                    alt="Download Paren in the Apple AppStore"
                                />
                            </a>
                            <div className="m-4"></div>
                            <a href={parenGoogleDownloadURL}>
                                <img
                                    width={240}
                                    height={80}
                                    src="/playstore_dl.png"
                                    alt="Download Paren in the Google Play Store"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div id="japan-vacaction">
                    <CountdownClock targetDate={vacationJapan.getTime()} label="日本 Urlaub 2024" bg_color="orange-600" dark_bg_color="orange-600" />
                </div>
                <MyFooterParen />
            </body>
        </html>
    );
}