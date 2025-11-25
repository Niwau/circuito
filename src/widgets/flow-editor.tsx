import { useState, useCallback, MouseEvent } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeTypes,
  useReactFlow,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { HttpNode, HttpNodeProps } from "../shared/ui/nodes/http";
import { Play } from "lucide-react";
import { Button } from "../shared/ui/button";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes: NodeTypes = {
  http: HttpNode,
};

export const FlowEditor = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const addNode = useCallback(
    (e: MouseEvent) => {
      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });

      const node: HttpNodeProps = {
        type: "http",
        id: (nodes.length + 1).toString(),
        data: { method: "GET", url: "https://example.com" },
        position: {
          x: position.x - 100,
          y: position.y - 25,
        },
      };

      setNodes((nds) => nds.concat(node));
    },
    [nodes, screenToFlowPosition],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        onPaneClick={addNode}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <Panel>
          <Button>
            <Play />
            Run Flow
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
};
