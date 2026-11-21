import { notFound } from "next/navigation";
import { CoffeeScene, LandmarkScene, OpeningScene } from "@/components/scenes";
import { Navigation } from "@/components/navigation";
import { SceneMotion } from "@/components/scene-motion";
import { exhibitionCopy, isLocale, localePaths } from "@/lib/exhibition";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const copy = exhibitionCopy[locale];
  const otherLocale = locale === "ar" ? "en" : "ar";
  return (
    <>
      <a className="skip-link" href="#exhibition">
        {copy.skip}
      </a>
      <Navigation
        title={copy.title}
        edition={copy.edition}
        labels={copy.navigation}
        navLabel={copy.chaptersLabel}
        menuLabel={copy.menu}
        closeLabel={copy.closeMenu}
        otherLocale={otherLocale}
        otherPath={localePaths[otherLocale]}
      />
      <main id="exhibition" tabIndex={-1}>
        <OpeningScene copy={copy} />
        {copy.chapters.map((chapter) => (
          <LandmarkScene key={chapter.id} chapter={chapter} copy={copy} />
        ))}
        <CoffeeScene copy={copy} />
      </main>
      <SceneMotion rootId="exhibition" />
    </>
  );
}
