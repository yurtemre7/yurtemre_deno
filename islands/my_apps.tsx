import { useSignal } from "@preact/signals";

interface App {
    id: number;
    name: string;
    description: string;
}

export default function MyApps() {

    const selectedApp = useSignal<App | null>(null);

    const apps : App[] = [
        { id: 1, name: 'WoAuto', description: 'Mit WoAuto verlierst du nie wieder dein Auto, Fahrrad oder sonst was du parken kannst!' },
        { id: 2, name: 'SteelMouse', description: 'Eine Windows-python App, um den Batteriestand deiner SteelSeries Maus immer im System-Tray zu sehen.' },
        { id: 3, name: 'AnimInu', description: 'Ein Anime Episoden-Tracker, mit sync Funktion über mehrere Geräte gleichzeitig.' },
        { id: 4, name: 'BetterChat', description: 'Meine kleine closed-source Chat App mit cleaner UI.' },
    ];

    return (
        <div className="flex justify-center items-center text-center">
          <div className="w-1/2">
            <h3 className="text-3xl font-bold mb-4">Meine Apps</h3>
            <ul>
              {apps.map(app => (
                <li 
                  key={app.id}
                  className={`hover:underline hover:text-blue-200 cursor-pointer ${selectedApp.value?.id === app.id ? 'text-blue-200 underline' : ''}`} 
                  onClick={() => selectedApp.value = app}
                >
                  {app.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2">
            {selectedApp.value && (
              <>
                <h3 className="text-3xl font-bold mb-4">{selectedApp.value.name}</h3>
                <p>{selectedApp.value.description}</p>
              </>
            )}
          </div>
        </div>
      );
}