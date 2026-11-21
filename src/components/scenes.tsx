import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Box,
} from "lucide-react";
import type { CSSProperties } from "react";
import { ModelPreview } from "./three/model-preview";
import { coffeeReview, coffeeReviewEnabled } from "@/lib/coffee-review";
import {
  approvedAssets,
  coffeeLights,
  previewCameras,
} from "@/lib/model-preview";
import highlands from "../../public/media/highlands.webp";
import ibexReference from "../../public/media/ibex-reference.webp";
import { contactUrl, exhibitionCopy } from "@/lib/exhibition";
import {
  coffeeObjects,
  landmarkSlots,
  type CoffeeObject,
} from "@/lib/scene-assets";

type Copy = (typeof exhibitionCopy)[keyof typeof exhibitionCopy];
type Chapter = Copy["chapters"][number];

export function OpeningScene({ copy }: { copy: Copy }) {
  return (
    <section
      id="opening"
      className="scene opening"
      aria-labelledby="opening-title"
      tabIndex={-1}
    >
      <Image
        className="opening-plate"
        src={highlands}
        alt=""
        fill
        sizes="100vw"
        preload
      />
      <div className="opening-shade" aria-hidden="true" />
      <div className="shell opening-inner">
        <div className="opening-content">
          <p className="edition eyebrow">
            <span aria-hidden="true" />
            {copy.edition}
          </p>
          <h1 id="opening-title">
            <span className="opening-place">
              {copy.opening.place}
              <span className="sr-only"> — </span>
            </span>
            {copy.opening.headline} <em>{copy.opening.emphasis}</em>
          </h1>
          <p className="opening-description">{copy.description}</p>
          <a className="button button-primary" href="#ibex">
            {copy.opening.explore}
            <ArrowDownRight
              size={17}
              strokeWidth={1.65}
              className="directional-icon"
              aria-hidden="true"
            />
          </a>
        </div>
        <div className="opening-object">
          <IbexReference opening />
          <span className="opening-caption">{copy.heroPlaceholder}</span>
        </div>
        <a className="scroll-link eyebrow" href="#ibex">
          <ArrowDown size={14} strokeWidth={1.55} aria-hidden="true" />
          {copy.opening.scroll}
        </a>
      </div>
    </section>
  );
}

function IbexReference({
  opening = false,
  description = "",
}: {
  opening?: boolean;
  description?: string;
}) {
  return (
    <Image
      src={ibexReference}
      alt={description}
      sizes={
        opening
          ? "(max-width: 48rem) 65vw, 42vw"
          : "(max-width: 48rem) 76vw, 38vw"
      }
      className="ibex-reference"
      loading={opening ? "eager" : "lazy"}
      fetchPriority={opening ? "high" : "auto"}
    />
  );
}

export function LandmarkScene({
  chapter,
  copy,
}: {
  chapter: Chapter;
  copy: Copy;
}) {
  const { id, title, category, description } = chapter;
  const modelPath = approvedAssets[id];
  const plate = (
    <div className="stage-plate">
      <span className="stage-reticle" aria-hidden="true" />
      {id === "ibex" && (
        <IbexReference description={copy.ibexImageDescription} />
      )}
    </div>
  );
  return (
    <section
      id={id}
      className={`scene chapter scene-${id}`}
      aria-labelledby={`${id}-title`}
      tabIndex={-1}
    >
      <div className="shell editorial-grid">
        <div className="chapter-copy" data-reveal>
          <p className="eyebrow chapter-category">
            <span aria-hidden="true" />
            {category}
          </p>
          <h2 id={`${id}-title`}>{title}</h2>
          <p className="chapter-description">{description}</p>
        </div>
        <figure
          className="asset-stage"
          data-model-state={modelPath ? "available" : "pending"}
        >
          {modelPath ? (
            <ModelPreview
              labels={copy.preview}
              scene={{
                kind: id === "ibex" ? "ibex" : "architecture",
                path: modelPath,
                camera: previewCameras[id],
                lights: landmarkSlots[id].lights,
              }}
            >
              {plate}
            </ModelPreview>
          ) : (
            plate
          )}
          <figcaption className="stage-caption eyebrow">
            <Box size={15} strokeWidth={1.5} aria-hidden="true" />
            {modelPath
              ? copy.preview.caption
              : id === "ibex"
                ? copy.heroPlaceholder
                : copy.placeholder}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function beanStyles(bean: CoffeeObject) {
  const [wideX, wideY] = bean.responsivePlacement.wide;
  const [compactX, compactY] = bean.responsivePlacement.compact;
  return {
    "--bean-x": `${50 + wideX * 23}%`,
    "--bean-y": `${49 - wideY * 23}%`,
    "--bean-compact-x": `${50 + compactX * 31}%`,
    "--bean-compact-y": `${49 - compactY * 23}%`,
    "--bean-rotation": `${bean.rotation[2]}rad`,
    "--bean-scale": bean.scale,
    "--bean-depth": bean.position[2] > 0 ? 2 : 1,
    "--bean-tone": bean.material.baseColor,
    "--bean-travel": `${bean.float.amplitude * -80}px`,
  } as CSSProperties;
}

export function CoffeeScene({ copy }: { copy: Copy }) {
  const review = coffeeReviewEnabled();
  const paths = review
    ? {
        "bean-a": coffeeReview["bean-a"].model,
        "bean-b": coffeeReview["bean-b"].model,
      }
    : approvedAssets.coffee;
  const canPreview = paths && paths["bean-a"] !== paths["bean-b"];
  const plate = (
    <div className="coffee-plate" aria-hidden="true">
      {coffeeObjects.map((bean) => (
        <div
          className="bean-position"
          data-bean={bean.id}
          key={bean.id}
          style={beanStyles(bean)}
        >
          {review ? (
            <Image
              src={coffeeReview[bean.id].poster}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 48rem) 35vw, 15vw"
              className="bean-poster"
            />
          ) : (
            <div className="bean" />
          )}
        </div>
      ))}
    </div>
  );
  return (
    <section
      id="coffee"
      className="scene scene-coffee"
      aria-labelledby="coffee-title"
      tabIndex={-1}
    >
      <div className="shell editorial-grid">
        <div className="chapter-copy" data-reveal>
          <p className="eyebrow chapter-category">
            <span aria-hidden="true" />
            {copy.coffee.category}
          </p>
          <h2 id="coffee-title">{copy.coffee.title}</h2>
          <p className="chapter-description">{copy.coffee.description}</p>
        </div>
        <figure
          className="coffee-stage"
          data-model-state={
            review ? "review" : canPreview ? "available" : "pending"
          }
        >
          {canPreview ? (
            <ModelPreview
              labels={copy.preview}
              scene={{
                kind: "coffee",
                camera: previewCameras.coffee,
                lights: coffeeLights,
                beans: [
                  {
                    path: paths["bean-a"],
                    transform: coffeeObjects[0],
                    motionEnabled: true,
                  },
                  {
                    path: paths["bean-b"],
                    transform: coffeeObjects[1],
                    motionEnabled: true,
                  },
                ],
              }}
            >
              {plate}
            </ModelPreview>
          ) : (
            plate
          )}
          <figcaption className="stage-caption eyebrow">
            <Box size={15} strokeWidth={1.5} aria-hidden="true" />
            {canPreview
              ? review
                ? copy.preview.coffeeReview
                : copy.preview.caption
              : copy.coffee.placeholder}
          </figcaption>
        </figure>
      </div>
      <footer className="shell finale">
        <div className="finale-content" data-reveal>
          <h2>{copy.finale.heading}</h2>
          <a className="button button-primary" href={contactUrl}>
            {copy.finale.contact}
            <ArrowUpRight
              size={17}
              strokeWidth={1.65}
              className="directional-icon"
              aria-hidden="true"
            />
          </a>
        </div>
        <div className="footer-bar">
          <span>
            {copy.title} <span aria-hidden="true">/</span> {copy.edition}
          </span>
          <a href="#opening">
            <ArrowUp size={15} aria-hidden="true" />
            {copy.finale.back}
          </a>
        </div>
      </footer>
    </section>
  );
}
