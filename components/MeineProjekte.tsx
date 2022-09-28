import { Repositories } from "./classes/Github.ts";

interface RepositoryProps {
  repos: Repositories;
}

export default function MeineProjekte({ repos }: RepositoryProps) {
  return (
    <div class="dark:bg-black m-10">
      <div class="h-screen text-center flex items-center justify-center">
        <div class="dark:text-gray-500">
          <p class="text-5xl font-bold hover:underline">
            Meine Projekte 💻
          </p>
          {repos.length == 0
            ? <p class="p-12">Github Time Out Fehler xD</p>
            : ""}
          <div class="p-12 flex flex-wrap items-center justify-around gap-4">
            {repos.length != 0
              ? repos.map((repo) => (
                <div class="group">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    class="text-2xl group-hover:underline group-hover:text-white"
                  >
                    {repo.name}
                  </a>
                  <p class="text-sm group-hover:text-white">
                    {repo.description}
                  </p>
                </div>
              ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
