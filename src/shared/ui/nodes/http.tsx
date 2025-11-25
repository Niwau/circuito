import { Handle, Node, NodeProps, Position } from "@xyflow/react";

export type HttpMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type HttpNodeProps = Node<{
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url?: string;
}>;

export const HttpNode = ({ data }: NodeProps<HttpNodeProps>) => {
  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #ddd",
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
      }}
    >
      <strong>HTTP Node</strong>
      <div>Method: {data.method || "GET"}</div>
      <div>URL: {data.url || "N/A"}</div>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
};
