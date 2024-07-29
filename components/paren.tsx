const parenURL = "https://yurtemre7.github.io/paren/";
const parenDownloadURL = "https://apps.apple.com/us/app/paren/id6578395712";

export default function Paren() {
    return (
        <div id="contact-me" className="min-h-screen flex flex-row items-center justify-center bg-orange-600">
            <div className="text-center items-center w-1/2">
                <h2 className="text-4xl font-bold text-white mb-4">Check it out here</h2>
                <div className="flex justify-center mt-6">
                    <iframe src={parenURL} height="600" width="300">

                    </iframe>
                </div>
            </div>
            <div className="text-center items-center w-1/2">
                <h2 className="text-4xl font-bold text-white mb-4">Download Paren👇</h2>
                <div className="flex justify-center">
                    <a href={parenDownloadURL}>
                        <img
                            src="/appstore_dl.svg"
                            alt="Download Paren in the Apple AppStore"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}