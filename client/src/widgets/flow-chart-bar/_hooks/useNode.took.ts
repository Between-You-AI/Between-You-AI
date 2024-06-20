import { useState, useCallback } from 'react';
import { Node, OnNodesChange } from './types';

const useNodes = (initialNodes: Node[]) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const onNodesChange: OnNodesChange = useCallback((newNodes: Node[]) => {
    setNodes(newNodes);
  }, []);

  return [nodes, onNodesChange] as const;
};

export default useNodes;