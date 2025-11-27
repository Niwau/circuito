import { invoke } from "@tauri-apps/api/core";
import { HttpNodeProps } from "@/entities/http/ui/http-node";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  XYPosition,
} from "@xyflow/react";
import { create } from "zustand";
import { HttpResponse } from "@/entities/http/models";

export interface FlowState {
  nodes: Node[];
  edges: Edge[];
  futureNodePosition?: XYPosition;
  isRunning: boolean;
}

export interface FlowActions {
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  setNode: (nodeId: string, data: HttpNodeProps) => void;
  setFutureNodePosition: (position: XYPosition) => void;
  runFlow: () => Promise<void>;
  runNode: (nodeId: string) => Promise<void>;
  getNode: (nodeId: string) => Node<HttpNodeProps> | undefined;
}

export type FlowStore = FlowState & FlowActions;

export const useFlowStore = create<FlowStore>((set, get) => ({
  nodes: [],
  edges: [],
  isRunning: false,
  getNode: (nodeId: string) => {
    return get().nodes.find((n) => n.id === nodeId) as
      | Node<HttpNodeProps>
      | undefined;
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },
  setFutureNodePosition: (position) => {
    set({ futureNodePosition: position });
  },
  setNode: (nodeId, data) => {
    const nodes = get().nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            ...data,
          },
        };
      }
      return node;
    });
    set({ nodes });
  },
  runNode: async (id: string) => {
    const setNode = get().setNode;
    const getNode = get().getNode;
    let start = Date.now();

    const currentNode = getNode(id);

    if (!currentNode) {
      console.error(`Tried to run a node that does not exist ${id}`);
      return;
    }

    setNode(id, {
      status: "running",
    });

    let data = currentNode.data;

    try {
      let response = await invoke<HttpResponse>("http_request", {
        request: {
          url: currentNode.data.url,
          method: currentNode.data.method,
        },
      });
      data.status = "success";
      data.info = response.status.toString();
    } catch (e) {
      console.error(`Error on node $id}`, e);
      let error = e as HttpResponse;
      data.status = "error";
      data.info = error.status.toString();
    } finally {
      let end = Date.now();
      const ms = end - start;
      data.info += ` - ${ms}ms`;
      setNode(id, data);
    }
  },
  runFlow: async () => {
    const nodes = get().nodes;
    const edges = get().edges;
    const runNode = get().runNode;

    const adjacencyList = new Map<string, string[]>();
    const inDegree = new Map<string, number>();

    nodes.forEach((node) => {
      adjacencyList.set(node.id, []);
      inDegree.set(node.id, 0);
    });

    edges.forEach((edge) => {
      adjacencyList.get(edge.source)?.push(edge.target);
      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    });

    const queue: string[] = [];
    inDegree.forEach((degree, nodeId) => {
      if (degree === 0) queue.push(nodeId);
    });

    while (queue.length > 0) {
      const currentNodeId = queue.shift();
      if (!currentNodeId) break;

      const currentNode = nodes.find((n) => n.id === currentNodeId);
      if (!currentNode) continue;

      await runNode(currentNodeId);

      const neighbors = adjacencyList.get(currentNodeId) || [];

      for (const neighborId of neighbors) {
        const currentDegree = (inDegree.get(neighborId) || 0) - 1;
        inDegree.set(neighborId, currentDegree);
        if (currentDegree === 0) {
          queue.push(neighborId);
        }
      }
    }
  },
}));
