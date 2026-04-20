export type Classification = "grand-cru" | "premier-cru" | "village";

export type NodeType = "region" | "subregion" | "village" | "climat";

export interface Stratum {
  id: string;
  name: string;
  name_fr: string;
  depth_start: number;
  depth_end: number;
  color: string;
}

export interface Climat {
  id: string;
  name: string;
  type: "climat";
  classification: Classification;
  area_ha: number;
  village: string;
  geology_summary: string;
  strata: Stratum[];
}

export interface Village {
  id: string;
  name: string;
  type: "village";
  children: Climat[];
}

export interface Subregion {
  id: string;
  name: string;
  type: "subregion";
  description: string;
  children: Village[];
}

export interface Region {
  id: string;
  name: string;
  type: "region";
  children: Subregion[];
}

export type NavigationNode = Region | Subregion | Village | Climat;
