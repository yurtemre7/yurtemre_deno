import { useSignal } from "@preact/signals";

interface App {
    id: number;
    name: string;
    description: string;
}

export default function AboutMe() {
    const diff = new Date().getTime() - new Date("2020-10-01").getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const semester = Math.ceil(days / (365 / 2));

    const selectedApp = useSignal<App | null>(null);

    const apps = [
        { id: 1, name: 'WoAuto', description: 'Mit WoAuto verlierst du nie wieder dein Auto, Fahrrad oder sonst was du parken kannst!' },
        { id: 2, name: 'SNP', description: 'SNP gibt es zwar noch nicht, aber wenn du auf eine Revolution von HTTP wartest, dann bist du hier genau richtig!' },
        { id: 3, name: 'Deez', description: 'Nuts :D' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-cente">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Über mich</h2>
                <p class="text-2xl mb-8 ml-32 mr-32">
                    Emre ist ein Informatik Student im {semester}. Semester an der{"  "}
                    <a
                        class="hover:underline font-bold"
                        href="https://www.tu.berlin/"
                    >
                        TU Berlin
                    </a>{" "}
                    und arbeitet bei{" "}
                    <a
                        class="hover:underline font-bold"
                        href="https://www.deinerstertag.de/"
                    >
                        Dein erster Tag
                    </a>{" "}
                    als Junior Frontend Entwickler, spezifischer in der Cross-Platform
                    App-Entwicklung mit{"  "}
                    <a
                        class="hover:underline font-bold"
                        href="https://flutter.dev"
                    >
                        Flutter
                    </a>.
                </p>
                <p className="text-xl">
                    Hier findest du all meine Projekte:{" "}
                    <a
                        className="hover:underline font-bold"
                        href="https://github.com/yurtemre7"
                    >
                        GitHub
                    </a>
                </p>
                <div className="mt-12" />
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <h3 className="text-3xl font-bold mb-4">Best Apps</h3>
                        <ul>
                            {apps.map(app => (
                                <li key={app.id} className="underline hover:text-blue-200 cursor-pointer" onClick={() => selectedApp.value = app}>{app.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-1/2">
                        {selectedApp.value && (
                            <>
                                <h3 className="text-3xl font-bold  mb-4">{selectedApp.value.name}</h3>
                                <p className="">{selectedApp.value.description}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}