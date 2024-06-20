export interface Node {
  id: string;
  data: any;
  position: { x: number; y: number };
  type?: string;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export type OnNodesChange = (nodes: Node[]) => void;
export type OnEdgesChange = (edges: Edge[]) => void;
export type OnConnect = (connection: Edge) => void;