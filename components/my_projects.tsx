import { Repositories } from "./classes/Github.ts";

interface RepositoryProps {
    repos: Repositories;
}

export default function MyProjects({ repos }: RepositoryProps) {
    // shuffle the repos
    repos = repos.sort(() => 0.5 - Math.random());

    // get avatar url from first repo
    const avatarUrl = repos.at(0)?.owner.avatar_url || "";

    return (
        <div className="w-full min-h-screen text-center flex items-center justify-center">
            <div>
                <p className="text-4xl font-bold mb-4">
                    Meine Projekte
                </p>
                <div className="pt-8" />
                <a href="https://github.com/yurtemre7" target="_blank">
                    <image
                        className="w-20 h-20 mx-auto"
                        src={avatarUrl}
                        alt="Github profile picture"
                    />
                </a>
                <p className="text-xl pt-12 pb-12">
                    Hier findest du eine Liste meiner Projekte, die ich in meiner Freizeit
                    entwickelt habe und weiter entwickle.
                </p>
                <div className="grid grid-cols-1 sm:flex sm:flex-wrap sm:place-content-center flex-wrap gap-6 m-20">
                    {repos.length != 0
                        ? repos.map((repo, index) => (
                            <div>
                                <div className="group rounded-2xl border-4">
                                    <div className="group-hover:bg-blue-800 p-4 rounded-2xl">
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            className="text-xl group-hover:underline truncate"
                                        >
                                            {repo.name}
                                        </a>
                                        {(repo.description?.length ?? 0) > 0
                                            ? (
                                                <p className="text-sm truncate">
                                                    {repo.description}
                                                </p>
                                            )
                                            : (
                                                <p className="text-sm truncate">
                                                    Keine Beschreibung vorhanden
                                                </p>
                                            )}

                                        {(repo.language?.length ?? 0) > 0
                                            ? (
                                                <p className="text-sm truncate">
                                                    mit {repo.language}
                                                </p>
                                            )
                                            : (
                                                <p className="text-sm truncate">
                                                    Keine Programmiersprache angegeben
                                                </p>
                                            )}
                                    </div>

                                </div>
                            </div>
                        ))
                        : <p className="p-12">Github Time Out Fehler xD</p>}
                </div>
            </div>
        </div>
    );
}