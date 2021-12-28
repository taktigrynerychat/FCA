export interface ConceptLatticeMetadata {
  id: number | string;
  full?: boolean;
}

export interface ConceptLatticeFromServer {
  nodes: ConceptLatticeNode[];
  links: ConceptLatticeLink[];
  maxLevel: number;
  lastNode: number;
  analogicalComplexes: any[];
}

export type ConceptLatticeNode = { objects: string[], attributes: string[], level: number };
export type ConceptLatticeLink = { source: number, target: number };

