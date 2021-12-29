export interface ConceptLatticeMetadata {
  id: number | string;
  full?: boolean;
}

export interface ConceptLatticeFromServer {
  nodes: ConceptLatticeNode[];
  links: ConceptLatticeLink[];
  maxLevel: number;
  lastNode: number;
}

export type ConceptLatticeNode = {
  objects: string[],
  attributes: string[],
  level: number,

  x?: number,
  y?: number,
  initialY?: number,
  ownedObjects?: string[],
  ownedAttributes?: string[],
  fixed?: boolean,
};
export type ConceptLatticeLink = {
  source: number,
  target: number
};

