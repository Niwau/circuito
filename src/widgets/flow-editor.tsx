import {
  ReactFlow,
  Background,
  NodeTypes,
  useReactFlow,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { HttpNode } from "../shared/ui/nodes/http";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
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
});

// const addNode = useCallback(
//   (e: MouseEvent) => {
//     const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
//
//     const node: HttpNodeType = {
//       type: "http",
//       id: (nodes.length + 1).toString(),
//       data: {
//         method: "DELETE",
//         url: "https://example.com",
//         status: "success",
//       },
//       position: {
//         x: position.x - 100,
//         y: position.y - 25,
//       },
//     };
//
//     setNodes([...nodes, node]);
//   },
//   [nodes, screenToFlowPosition],
// );

export const FlowEditor = () => {
  const { screenToFlowPosition } = useReactFlow();
  const { setNodes, nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowStore(useShallow(selector));

  const dialog = useToggle();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
              <Button>
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
