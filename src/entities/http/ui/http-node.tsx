import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { cva, type VariantProps } from "class-variance-authority";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type NodeStatus = "idle" | "executing" | "success" | "error";

export type HttpNodeProps = {
  url?: string;
  className?: string;
  code?: number;
} & VariantProps<typeof httpNodeVariants>;

const httpNodeVariants = cva("p-4 bg-white border rounded", {
  variants: {
    method: {
      GET: "",
      POST: "",
      PUT: "",
      DELETE: "",
      PATCH: "",
    },
    status: {
      idle: "border-gray-300",
      running: "border-blue-500",
      success: "border-green-500",
      error: "border-red-500",
    },
  },
  defaultVariants: {
    method: "GET",
    status: "idle",
  },
});

export type HttpNodeType = Node<HttpNodeProps>;

export const HttpNode = ({
  data: {
    status,
    className,
    method,
    url = "https://api.example.com/api/v1",
    code,
  },
}: NodeProps<HttpNodeType>) => {
  return (
    <div className={httpNodeVariants({ method, className, status })}>
      <div>
        <h1 className="font-bold text-xs">{method}</h1>
        <p className="text-md font-light text-sm">{url}</p>
      </div>
      <div className="mt-2 flex justify-end">
        <h1 className="font-bold text-xs">{code}</h1>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
