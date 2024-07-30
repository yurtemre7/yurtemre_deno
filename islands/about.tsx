import { useSignal } from "@preact/signals";

const avatarUrl = "https://avatars.githubusercontent.com/u/28185198?v=4";

export default function AboutMe() {
    const rotate = useSignal({ x: 0, y: 0 });
    const diff = new Date().getTime() - new Date("2020-10-01").getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const semester = Math.ceil(days / (365 / 2));

    const onMouseMove = (e: MouseEvent) => {
        const card = e.currentTarget as HTMLDivElement;
        const box = card?.getBoundingClientRect();
        const x = (e.clientX - box.left);
        const y = (e.clientY - box.top);
        const centerX = box.width / 2;
        const centerY = box.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        rotate.value = { x: rotateX, y: rotateY };
    }

    const onMouseLeave = () => {
        rotate.value = { x: 0, y: 0 };
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex sm:flex-row flex-col m-16 items-center justify-center">
                <img
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    style={{
                        transform: `perspective(1000px) rotateX(${rotate.value.x}deg) rotateY(${rotate.value.y}deg) scale3d(1, 1, 1)`,
                        transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
                    }}
                    src={avatarUrl}
                    alt="Github profile picture"
                    className="w-70 h-70 pulse rounded-lg bg-slate-900 flex sm:w-1/4 mb-8"
                >
                </img>

                <div className="text-center sm:w-3/4">
                    <h2 className="text-4xl font-bold">Über mich</h2>
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
                        <br />
                        Auf meinem <a href="https://github.com/yurtemre7" target="_blank" className="hover:underline font-bold">
                            GitHub
                        </a>{" "}
                        findest du meine Projekte!
                    </p>
                </div>
            </div>
        </div>
    );
}