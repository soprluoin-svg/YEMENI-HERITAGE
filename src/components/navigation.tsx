"use client";

import { Globe2, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { sceneIds, type Locale, type SceneId } from "@/lib/exhibition";

type Props = {
  title: string;
  edition: string;
  labels: Record<SceneId, string>;
  navLabel: string;
  menuLabel: string;
  closeLabel: string;
  otherLocale: Locale;
  otherPath: string;
};

export function Navigation({
  title,
  edition,
  labels,
  navLabel,
  menuLabel,
  closeLabel,
  otherLocale,
  otherPath,
}: Props) {
  const [active, setActive] = useState<SceneId>("opening");
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = sceneIds.flatMap((id) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    let frame = 0;
    function updateActive() {
      const readingLine = window.innerHeight * 0.35;
      const current = sections.find(({ element }) => {
        const { top, bottom } = element.getBoundingClientRect();
        return top <= readingLine && bottom > readingLine;
      });
      if (current) setActive(current.id);
    }

    function scheduleUpdate() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    }

    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const desktop = window.matchMedia("(min-width: 61rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };

    menu.current?.querySelector("a")?.focus();
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function selectScene(id: SceneId) {
    setActive(id);
    if (open) {
      setOpen(false);
      document.getElementById(id)?.focus({ preventScroll: true });
    }
  }

  return (
    <header className="site-header">
      <div className="shell header-grid">
        <a
          className="wordmark"
          href="#opening"
          onClick={() => selectScene("opening")}
        >
          <span className="wordmark-emblem" aria-hidden="true" />
          <span>
            <span className="wordmark-title">{title}</span>
            <span className="wordmark-edition">{edition}</span>
          </span>
        </a>
        <nav aria-label={navLabel} className="chapter-nav">
          <ul id="chapter-links" ref={menu} data-open={open}>
            {sceneIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  onClick={() => selectScene(id)}
                >
                  {labels[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <Link
            className="locale-switch"
            href={otherPath}
            hrefLang={otherLocale}
            lang={otherLocale}
            dir={otherLocale === "ar" ? "rtl" : "ltr"}
            prefetch={false}
          >
            <Globe2 size={15} aria-hidden="true" />
            {otherLocale === "ar" ? "العربية" : "English"}
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-controls="chapter-links"
            aria-expanded={open}
            aria-label={open ? closeLabel : menuLabel}
            onClick={() => setOpen(!open)}
            ref={toggle}
          >
            {open ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
