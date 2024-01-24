
import React, { useState, useCallback } from 'react';
import Dagre from '@dagrejs/dagre';

import ReactFlow, {
  MiniMap,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

const flowKey = 'example-flow';
const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const getNodeId = () => `randomnode_${+new Date()}`;

import { initialEdges ,initialNodes} from './nodes-edges';

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onAdd = useCallback(() => {
    const userLabel = prompt("Enter Data for the new node"); 
    const existingNode = nodes.find((node) => node.data.label === userLabel);
    if (existingNode) {
      alert(`Node with label "${userLabel}" already exists. Please choose a different label.`);
      return;
    }
    const userColor = prompt("Select a color for the new node (red, blue, green)").toLowerCase();
    let newNodeColor;

    switch (userColor) {
      case 'red':
        newNodeColor = 'red';
        break;
      case 'blue':

      
      
        newNodeColor = 'blue';
        break;
      case 'green':
        newNodeColor = 'green';
        break;
      default:
        newNodeColor = 'gray'; // Default color for invalid input
        break;
    }
    const newNode = {
      id: getNodeId(),
      data: {label: userLabel,
              color: newNodeColor},
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);
  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );


  return (
    <div style={{height:'100vh',width:'100vw'}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
    >
      <Panel position="top-right">
        <button onClick={onAdd}>add node</button>
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>
      <Controls />
      <MiniMap />
    </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
);
