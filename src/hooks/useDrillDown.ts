import { useState, useCallback } from "react";
import data from "../data/mock.json";
import type { NavigationNode, Region } from "../types";

const typedData = data as Region;

function findNode(root: NavigationNode, id: string): NavigationNode | null {
  if (root.id === id) return root;
  if (!("children" in root)) return null;
  for (const child of root.children) {
    const found = findNode(child as NavigationNode, id);
    if (found) return found;
  }
  return null;
}

function buildCrumbs(
  root: NavigationNode,
  targetId: string,
  trail: NavigationNode[] = [],
): NavigationNode[] | null {
  if (root.id === targetId) return [...trail, root];
  if (!("children" in root)) return null;
  for (const child of root.children) {
    const result = buildCrumbs(child as NavigationNode, targetId, [
      ...trail,
      root,
    ]);
    if (result) return result;
  }
  return null;
}

export function useDrillDown() {
  const [currentId, setCurrentId] = useState<string>(typedData.id);

  const currentNode = findNode(typedData, currentId);
  const crumbs = buildCrumbs(typedData, currentId) || [];

  const drillInto = useCallback((id: string) => {
    setCurrentId(id);
  }, []);

  const drillBack = useCallback((id: string) => {
    setCurrentId(id);
  }, []);

  return {
    currentNode,
    crumbs,
    drillInto,
    drillBack,
    isClimat: currentNode?.type === "climat",
  };
}
