import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function FujiBG() {
  const bgop = useSignal<number>(0.35);
  const bgblur = useSignal<number>(1);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h1 = Math.max(
          1,
          document.body.scrollHeight - globalThis.innerHeight,
        );
        const h = Math.max(0, globalThis.scrollY || 0);
        const ratio = Math.max(0, Math.min(1, h / h1));
        bgop.value = ratio * -0.15 + 0.35;
        bgblur.value = ratio * 5 + 1;
      });
    };

    globalThis.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      globalThis.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div>
      <img
        src="/fuji.jpg"
        loading="lazy"
        className="absolute -z-10 inset-0"
        style={{
          filter: `blur(${bgblur.value}px)`,
          opacity: bgop.value,
          objectFit: "cover",
          position: "fixed",
          objectPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
        alt="Mount Fuji landscape"
      />
    </div>
  );
}
