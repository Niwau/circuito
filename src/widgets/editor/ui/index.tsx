import {
  ReactFlow,
  Background,
  NodeTypes,
  useReactFlow,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { HttpNode, HttpNodeType } from "@/entities/http/ui/node";
import { Play } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { FlowStore, useFlowStore } from "@/shared/store";
import { useShallow } from "zustand/shallow";
import { useToggle } from "@/shared/hooks/use-toggle";
import {
  ContextMenuTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from "@/shared/ui/context-menu";
import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

const nodeTypes: NodeTypes = {
  http: HttpNode,
};

const selector = (state: FlowStore) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  addNode: state.addNode,
  runFlow: state.runFlow,
  setFutureNodePosition: state.setFutureNodePosition,
  futureNodePosition: state.futureNodePosition,
});

export const FlowEditor = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    runFlow,
    addNode,
    setFutureNodePosition,
    futureNodePosition,
  } = useFlowStore(useShallow(selector));

  const { screenToFlowPosition } = useReactFlow();

  const dialog = useToggle();

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    setFutureNodePosition(screenToFlowPosition({ x: e.clientX, y: e.clientY }));
  }, []);

  const addHttpNode = useCallback(() => {
    dialog.toggle();
    const newNode: HttpNodeType = {
      id: uuid(),
      type: "http",
      position: futureNodePosition || { x: 0, y: 0 },
      data: {
        request: {
          url: "https://example.com/api/v1",
          method: "GET",
        },
      },
    };
    addNode(newNode);
  }, [futureNodePosition]);

  return (
    <ContextMenu>
      <ContextMenuTrigger onContextMenu={onContextMenu}>
        <div style={{ width: "100vw", height: "100vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Panel>
              <Button onClick={runFlow}>
                <Play />
                Run Flow
              </Button>
            </Panel>
            <Panel position="top-right">
              <ThemeToggle />
            </Panel>
          </ReactFlow>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuLabel>Add Node</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem inset onClick={addHttpNode}>
          HTTP Request
        </ContextMenuItem>
        <ContextMenuItem inset>gRPC Call</ContextMenuItem>
        <ContextMenuItem inset>Kafka Producer</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
