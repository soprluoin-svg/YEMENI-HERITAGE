import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SceneTransition = {
  travel: number;
  duration: number;
  enterAt: string;
};

const reveal: SceneTransition = {
  travel: 18,
  duration: 0.75,
  enterAt: "top 88%",
};

export function mountSceneMotion(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);

  const context = gsap.context(() => {
    const media = gsap.matchMedia(root);

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");

      elements.forEach((element) => {
        // Leave already visible content in place when enhancement starts.
        if (element.getBoundingClientRect().top < window.innerHeight) return;

        gsap.from(element, {
          y: reveal.travel,
          duration: reveal.duration,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: element,
            start: reveal.enterAt,
            once: true,
          },
        });
      });
    });

    return () => media.revert();
  }, root);

  return () => context.revert();
}
