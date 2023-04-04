import { Repositories, Repository } from "./classes/Github.ts";

interface RepositoryProps {
  repos: Repositories;
}

export default function MeineProjekte({ repos }: RepositoryProps) {
  // shuffle the repos
  repos = repos.sort(() => 0.5 - Math.random());

  // get avatar url from first repo
  const avatarUrl = repos.at(0)?.owner.avatar_url || "";

  return (
    <div class="p-16">
      <div class="h-full text-center flex items-center justify-center">
        <div>
          <p class="text-5xl font-bold hover:underline">
            Meine Projekte
          </p>
          <div class="pt-8" />
          <a href="https://github.com/yurtemre7" target="_blank">
            <image
              class="w-20 h-20 mx-auto"
              src={avatarUrl}
              alt="Github profile picture"
            />
          </a>
          <p class="text-xl py-5">
            Hier findest du eine Liste meiner Projekte, die ich in meiner
            Freizeit entwickelt habe und weiter entwickle.
          </p>
          <div class="flex flex-wrap gap-4 place-content-center">
            {repos.length != 0
              ? repos.map((repo, index) => (
                <div>
                  <div class="group rounded-2xl border-4 hover:border-black p-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      class="text-xl group-hover:underline"
                    >
                      {repo.name}
                    </a>
                    {repo.description?.length ?? 0 > 0
                      ? (
                        <p class="text-sm truncate">
                          {repo.description}
                        </p>
                      )
                      : (
                        <p class="text-sm">
                          Keine Beschreibung vorhanden
                        </p>
                      )}

                    {repo.language?.length ?? 0 > 0
                      ? (
                        <p class="text-sm">
                          mit {repo.language}
                        </p>
                      )
                      : (
                        <p class="text-sm">
                          Keine Programmiersprache angegeben
                        </p>
                      )}
                  </div>
                </div>
              ))
              : <p class="p-12">Github Time Out Fehler xD</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
