const parenURL = "https://yurtemre7.github.io/paren/";
const parenAppleDownloadURL = "https://apps.apple.com/us/app/paren/id6578395712";
const parenGoogleDownloadURL = "https://play.google.com/store/apps/details?id=de.emredev.paren";

export default function Paren() {
    return (
        <div id="contact-me" className="min-h-screen flex sm:flex-row flex-col items-center justify-center bg-orange-600">
            <div className="text-center items-center w-1/2 my-10">
                <h2 className="text-4xl font-bold text-white mb-8">Check it out here</h2>
                <div className="flex justify-center mt-6">
                    <iframe src={parenURL} height="600" width="300" />
                </div>
            </div>
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
    );
}