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
    <div class="dark:bg-black m-10">
      <div class="h-full text-center flex items-center justify-center">
        <div class="dark:text-gray-500">
          <p class="text-5xl font-bold hover:underline">
            Meine Projekte
          </p>
          <div class="m-8" />
          <a href="https://github.com/yurtemre7" target="_blank">
            <image class="w-20 mx-auto" src={avatarUrl} />
          </a>
          <div class="m-8" />
          <p class="text-xl">
            Hier findest du eine Liste meiner Projekte, die ich in meiner
            Freizeit entwickelt habe und weiter entwickle.
          </p>

          <div class="p-12 flex flex-wrap items-center justify-around gap-4">
            {repos.length != 0
              ? repos.map((repo, index) => (
                <div>
                  <div class="group border rounded-2xl border-4 hover:border-blue-500 dark:hover:border-white dark:border-gray-500 p-4">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      class="text-xl group-hover:underline dark:group-hover:text-white group-hover:text-blue-500"
                    >
                      {repo.name}
                    </a>
                    {repo.description?.length ?? 0 > 0
                      ? (
                        <p class="text-sm dark:group-hover:text-white group-hover:text-blue-500">
                          {repo.description}
                        </p>
                      )
                      : ""}

                    {repo.language?.length ?? 0 > 0
                      ? (
                        <p class="text-sm dark:group-hover:text-white group-hover:text-blue-500">
                          mit {repo.language}
                        </p>
                      )
                      : ""}
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
