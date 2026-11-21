"use client";

import { useEffect } from "react";

export function SceneMotion({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;

    const preference = window.matchMedia(
      "(prefers-reduced-motion: no-preference)",
    );
    let cleanup: (() => void) | undefined;
    let generation = 0;

    const sync = () => {
      const request = ++generation;
      cleanup?.();
      cleanup = undefined;
      if (!preference.matches) return;

      void import("@/lib/motion")
        .then(({ mountSceneMotion }) => {
          if (request === generation) cleanup = mountSceneMotion(root);
        })
        .catch(() => {
          // The server-rendered scenes remain readable if enhancement fails to load.
        });
    };

    // Wait until a subsequent chapter approaches the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        preference.addEventListener("change", sync);
        sync();
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    root.querySelectorAll(".scene:not(#opening)").forEach((scene) => {
      observer.observe(scene);
    });

    return () => {
      generation += 1;
      observer.disconnect();
      preference.removeEventListener("change", sync);
      cleanup?.();
    };
  }, [rootId]);

  return null;
}
