import React, { useCallback } from 'react';
import { Box } from '@mui/material';

import 'reactflow/dist/style.css';
import ReactFlow, { Controls, MiniMap, OnConnect, addEdge, useEdgesState, useNodesState } from 'reactflow';

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import TitleBar from '../common/widget-toolbox.component';
import BaseWidget from '../common/base-widget.component';

const FlowChartBar: React.FC = () => {

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  return (
    <BaseWidget widget_name='Flowchart' >
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
    </BaseWidget>
  );
};

export default FlowChartBar;