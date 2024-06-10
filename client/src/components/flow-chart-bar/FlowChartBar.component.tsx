import React, { useCallback } from 'react';
import { Box } from '@mui/material';

import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls, MiniMap, OnConnect, addEdge, useEdgesState, useNodesState } from 'reactflow';

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";

const FlowChartBar: React.FC = () => {

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    <Box sx={{ width: "100%", height:"100%", padding: 2 }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </Box>
  );
};

export default FlowChartBar;