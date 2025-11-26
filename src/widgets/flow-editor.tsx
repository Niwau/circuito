import {
  ReactFlow,
  Background,
  NodeTypes,
  useReactFlow,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { HttpNode } from "../entities/http/ui/http-node";
import { Play } from "lucide-react";
import { Button } from "../shared/ui/button";
import { FlowStore, useFlowStore } from "../shared/store";
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
import { HttpDialog } from "@/entities/http/ui/http-dialog";

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
  setFutureNodePosition: state.setFutureNodePosition,
  runFlow: state.runFlow,
});

export const FlowEditor = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setFutureNodePosition,
    runFlow,
  } = useFlowStore(useShallow(selector));

  const { screenToFlowPosition } = useReactFlow();

  const dialog = useToggle();

  const onContextMenu = (e: React.MouseEvent) => {
    setFutureNodePosition(screenToFlowPosition({ x: e.clientX, y: e.clientY }));
  };

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
          </ReactFlow>
        </div>
      </ContextMenuTrigger>

      <HttpDialog
        onClose={dialog.toggle}
        onOpenChange={dialog.toggle}
        isOpen={dialog.isOpen}
      />

      <ContextMenuContent className="w-64">
        <ContextMenuLabel>Add Node</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem inset onClick={dialog.toggle}>
          HTTP Request
        </ContextMenuItem>
        <ContextMenuItem inset>gRPC Call</ContextMenuItem>
        <ContextMenuItem inset>Kafka Producer</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
