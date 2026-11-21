"use client";

import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  BeanControlPair,
  BeanControls,
  PreviewScene,
} from "@/lib/model-preview";

const CanvasStage = lazy(() => import("./canvas-stage"));
const previewOpened = "yemeni-preview-open";

type PreviewLabels = {
  open: string;
  close: string;
  loading: string;
  failed: string;
  tree: string;
  palace: string;
  rotate: string;
  float: string;
};

type Props = {
  scene: PreviewScene;
  labels: PreviewLabels;
  children: ReactNode;
};

class PreviewBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function ModelPreview({ scene, labels, children }: Props) {
  const [status, setStatus] = useState<
    "closed" | "loading" | "ready" | "failed"
  >("closed");
  const [controls, setControls] = useState<BeanControlPair>([
    { floating: true, rotation: 0 },
    { floating: true, rotation: 0 },
  ]);

  function changeBean(
    index: 0 | 1,
    change: (previous: BeanControls) => BeanControls,
  ) {
    setControls((previous) =>
      index === 0
        ? [change(previous[0]), previous[1]]
        : [previous[0], change(previous[1])],
    );
  }

  const active = status === "loading" || status === "ready";

  useEffect(() => {
    const close = () => setStatus("closed");
    window.addEventListener(previewOpened, close);
    return () => window.removeEventListener(previewOpened, close);
  }, []);

  function togglePreview() {
    if (active) {
      setStatus("closed");
    } else {
      window.dispatchEvent(new Event(previewOpened));
      setStatus("loading");
    }
  }

  return (
    <>
      <div className="model-viewport" data-preview-status={status}>
        <div className="model-poster">{children}</div>
        {active && (
          <div className="model-canvas" aria-hidden="true" inert>
            <PreviewBoundary onFailure={() => setStatus("failed")}>
              <Suspense fallback={null}>
                <CanvasStage
                  scene={scene}
                  controls={controls}
                  onReady={() => setStatus("ready")}
                  onFailure={() => setStatus("failed")}
                />
              </Suspense>
            </PreviewBoundary>
          </div>
        )}
      </div>
      <div className="model-controls">
        <button type="button" onClick={togglePreview} aria-expanded={active}>
          {active ? labels.close : labels.open}
        </button>
        <span role="status">
          {status === "loading"
            ? labels.loading
            : status === "failed"
              ? labels.failed
              : ""}
        </span>
      </div>
      {scene.kind === "coffee" && status === "ready" && (
        <div className="model-controls">
          {([0, 1] as const).map((index) => {
            const name = index === 0 ? labels.tree : labels.palace;
            return (
              <fieldset className="bean-controls" key={index}>
                <legend>{name}</legend>
                <button
                  type="button"
                  aria-label={`${labels.rotate} · ${name}`}
                  onClick={() =>
                    changeBean(index, (bean) => ({
                      ...bean,
                      rotation: (bean.rotation + Math.PI / 6) % (2 * Math.PI),
                    }))
                  }
                >
                  {labels.rotate}
                </button>
                <button
                  type="button"
                  aria-label={`${labels.float} · ${name}`}
                  aria-pressed={controls[index].floating}
                  onClick={() =>
                    changeBean(index, (bean) => ({
                      ...bean,
                      floating: !bean.floating,
                    }))
                  }
                >
                  {labels.float}
                </button>
              </fieldset>
            );
          })}
        </div>
      )}
    </>
  );
}
