import { tw } from "twind";
import { Repositories } from "./classes/Github.ts";

interface RepositoryProps {
  repos: Repositories;
}

export default function MeineProjekte({ repos }: RepositoryProps) {
  return (
    <div class={tw`dark:bg-black m-10`}>
      <div
        class={tw`h-screen text-center flex items-center justify-center`}
      >
        <div class={tw`dark:text-gray-500`}>
          <p class={tw`text-5xl font-bold hover:underline`}>
            Meine Projekte 💻
          </p>
          {repos.length == 0
            ? <p class={tw`p-12`}>Github Time Out Fehler xD</p>
            : ""}
          <div class={tw`p-12 grid grid-cols-4 gap-4`}>
            {repos.length != 0
              ? repos.map((repo) => (
                <div class={tw`group`}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    class={tw`text-2xl group-hover:underline group-hover:text-white`}
                  >
                    {repo.name}
                  </a>
                  <p class={tw`text-sm group-hover:text-white`}>
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
