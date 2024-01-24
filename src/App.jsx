
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
import NodeAddModal from './NodeAddModal';

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
  const [searchString, setSearchString] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConnectedNodes, setShowConnectedNodes] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onAddNode = (userLabel, newNodeColor) => {
    const existingNode = nodes.find((node) => node.data.label === userLabel);

    if (existingNode) {
      alert(`Node with label "${userLabel}" already exists. Please choose a different label.`);
      return;
    }
    const newNode = {
      id: getNodeId(),
      data: {
        label: userLabel,
      },
      style:{background: newNodeColor,borderColor: newNodeColor},
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };

    setNodes((nds) => nds.concat(newNode));
    closeModal();
  };
  const handleSearchChange = (e) => {
    setSearchString(e.target.value);
  };

  const handleShowConnectedNodesChange = () => {
    setShowConnectedNodes(!showConnectedNodes);
  };

  const getFilteredNodes = () => {
    let filteredNodes = nodes.filter((node) =>
      node.data.label.toLowerCase().includes(searchString.toLowerCase())
    );
    if (showConnectedNodes) {
      const connectedNodeIds = edges
        .filter((edge) => filteredNodes.some((fn) => fn.id === edge.source || fn.id === edge.target))
        .map((edge) => [edge.source, edge.target])
        .flat();

      filteredNodes = [...filteredNodes, ...nodes.filter((node) => connectedNodeIds.includes(node.id))];
    }

    return filteredNodes;
  };

  const filteredNodes = getFilteredNodes();
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
    <div style={{height:'100vh',width:'100vw',position:'relative'}}>
    <ReactFlow
      nodes={filteredNodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
    >  
      <Panel position="top-right" >
      <div style={{ position: 'absolute', top: 100, left: 10,display:'flex',justifyContent:'left', zIndex: 1 }}>
          <label style={{ marginRight: '10px' }}>
            Search Nodes:
            <input
              type="text"
              placeholder="Enter search term"
              value={searchString}
              onChange={handleSearchChange}
              style={{ marginLeft: '5px', padding: '8px' }}
            />
          </label>
          <label style={{marginTop:'25px'}}>
            <input
              type="checkbox"
              checked={showConnectedNodes}
              onChange={handleShowConnectedNodesChange}
              style={{ marginRight: '5px',padding:'10px' }}
            />
            Connected Nodes
          </label>
        </div>
        <button onClick={openModal}>add node</button>
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>
      <Controls />
      <MiniMap />
      {isModalOpen && (
        <NodeAddModal onAddNode={onAddNode} closeModal={closeModal}/>
      )}
    </ReactFlow>
    </div>
  );
};
export default () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
);
