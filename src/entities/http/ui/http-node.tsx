import { cn } from "@/shared/lib/utils";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { cva, type VariantProps } from "class-variance-authority";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type NodeStatus = "idle" | "executing" | "success" | "error";

export type HttpNodeProps = {
  url?: string;
  className?: string;
  code?: number;
} & VariantProps<typeof httpNodeVariants>;

const httpNodeVariants = cva("p-4  border rounded", {
  variants: {
    method: {
      GET: "",
      POST: "",
      PUT: "",
      DELETE: "",
      PATCH: "",
    },
    status: {
      idle: "bg-white",
      running: "bg-white",
      success: "text-green-700 bg-white",
      error: "border-red-300 bg-red-100 text-red-700",
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
        <h1 className="font-bold text-xs text-black">{method}</h1>
        <p className="text-md font-light text-sm text-black">{url}</p>
      </div>
      <div className="mt-2 flex justify-end">
        <h1
          className={cn(
            "font-bold text-xs",
            status === "running" && "animate-bounce",
          )}
        >
          {status === "running" ? "..." : code}
        </h1>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
