import MyApps from "./my_apps.tsx";

export default function AboutMe() {
    const diff = new Date().getTime() - new Date("2020-10-01").getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const semester = Math.ceil(days / (365 / 2));

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Über mich</h2>
                <p className="text-2xl m-8">
                    Ich habe 2024 meinen Bachelor in Informatik an der <a
                        className="hover:underline font-bold"
                        href="https://www.tu.berlin/"
                    >
                        TU Berlin
                    </a>{" "} absolviert (heute wäre ich im {semester}. Semester)
                    und arbeite zurzeit bei{" "}
                    <a
                        className="hover:underline font-bold"
                        href="https://www.deinerstertag.de/"
                    >
                        Dein erster Tag
                    </a>{" "}
                    als Junior Frontend Entwickler in der Cross-Platform
                    App-Entwicklung mit{"  "}
                    <a
                        className="hover:underline font-bold"
                        href="https://flutter.dev"
                    >
                        Flutter
                    </a>.
                </p>
                <div className="mt-24" />
                <MyApps />
            </div>

        </div>
    );
}