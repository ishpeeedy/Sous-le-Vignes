import { useRef } from "react";
import type { NavigationNode } from "../types";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import IsometricTile from "./IsometricTile";
import styles from "./IsometricRibbon.module.css";

interface IsometricRibbonProps {
  nodes: NavigationNode[];
  onTileClick: (node: NavigationNode) => void;
}

export default function IsometricRibbon({
  nodes,
  onTileClick,
}: IsometricRibbonProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);

  const row0 = nodes.filter((_: NavigationNode, i: number) => i % 2 === 0);
  const row1 = nodes.filter((_: NavigationNode, i: number) => i % 2 === 1);

  return (
    <div className={styles.wrapper} ref={scrollRef}>
      <div className={styles.fadeEdge} />
      <div className={styles.isoContainer}>
        <div className={styles.grid}>
          <div className={styles.row}>
            {row0.map((node: NavigationNode) => (
              <IsometricTile key={node.id} node={node} onClick={onTileClick} />
            ))}
          </div>
          <div className={`${styles.row} ${styles.rowOffset}`}>
            {row1.map((node: NavigationNode) => (
              <IsometricTile key={node.id} node={node} onClick={onTileClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
