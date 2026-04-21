import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import type { NavigationNode } from "../types";
import styles from "./IsometricTile.module.css";

const CLASSIFICATION_COLORS: Record<string, string> = {
  "grand-cru": "var(--color-burgundy)",
  "premier-cru": "var(--color-burgundy-mid)",
  village: "var(--color-burgundy-pale)",
};

const LEVEL_COLORS: Record<string, string> = {
  region: "var(--color-tile-level-1)",
  subregion: "var(--color-tile-level-1)",
  village: "var(--color-tile-level-2)",
  climat: "var(--color-tile-level-2)",
};

interface IsometricTileProps {
  node: NavigationNode;
  onClick: (node: NavigationNode) => void;
}

export default function IsometricTile({ node, onClick }: IsometricTileProps) {
  const tileRef = useRef<HTMLDivElement>(null);

  const tileBg =
    node.type === "climat"
      ? node.classification === "grand-cru"
        ? "var(--color-tile-level-3-gc)"
        : node.classification === "premier-cru"
          ? "var(--color-tile-level-3-pc)"
          : "var(--color-tile-level-3-vl)"
      : LEVEL_COLORS[node.type];

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;

    const handleEnter = () => {
      gsap.to(el, { translateZ: 12, duration: 0.2, ease: "power2.out" });
    };

    const handleLeave = () => {
      gsap.to(el, { translateZ: 0, duration: 0.2, ease: "power2.out" });
    };

    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const classificationColor =
    node.type === "climat"
      ? CLASSIFICATION_COLORS[node.classification]
      : undefined;

  return (
    <div
      ref={tileRef}
      className={styles.tile}
      style={{ "--tile-bg": tileBg } as React.CSSProperties}
      onClick={() => onClick(node)}
      data-id={node.id}
    >
      <div className={styles.face}>
        <div className={styles.label}>
          <span className={styles.name}>{node.name}</span>
          {node.type === "climat" && (
            <span
              className={styles.pip}
              style={{ background: classificationColor }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
