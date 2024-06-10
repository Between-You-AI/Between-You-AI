import { useState, useCallback } from 'react';
import { Edge, OnEdgesChange, OnConnect } from './types';
import { addEdge } from 'reactflow'; // Assuming you are using a function like addEdge

const useEdges = (initialEdges: Edge[]) => {
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onEdgesChange: OnEdgesChange = useCallback((newEdges: Edge[]) => {
    setEdges(newEdges);
  }, []);

  const onConnect: OnConnect = useCallback(
    (connection: Edge) => {
      setEdges((currentEdges) => addEdge(connection, currentEdges));
    },
    [setEdges]
  );

  return [edges, onEdgesChange, onConnect] as const;
};

export default useEdges;