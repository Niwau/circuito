import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderIcon, Verified, X } from "lucide-react";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type NodeStatus = "idle" | "executing" | "success" | "error";

export type HttpNodeProps = {
  method?: HttpMethod;
  url?: string;
  status?: NodeStatus;
  className?: string;
} & VariantProps<typeof httpNodeVariants>;

const httpNodeVariants = cva("p-4 rounded", {
  variants: {
    method: {
      GET: "bg-blue-100",
      POST: "bg-green-100",
      PUT: "bg-yellow-100",
      DELETE: "bg-red-100",
      PATCH: "bg-purple-100",
    },
  },
  defaultVariants: {
    method: "GET",
  },
});

export type HttpNodeType = Node<HttpNodeProps>;

const statusIcon: Record<NodeStatus, React.ReactNode> = {
  idle: null,
  executing: <LoaderIcon />,
  success: <Verified />,
  error: <X />,
};

export const HttpNode = ({
  data: {
    status = "idle",
    className,
    method,
    url = "https://api.example.com/api/v1",
  },
}: NodeProps<HttpNodeType>) => {
  return (
    <div className={httpNodeVariants({ method, className })}>
      <div className="flex justify-between">
        <h1 className="font-bold text-xs">{method}</h1>
        {statusIcon[status]}
      </div>
      <p className="text-md font-light text-sm">{url}</p>
      <Handle type="source" position={Position.Left} />
      <Handle type="target" position={Position.Right} />
    </div>
  );
};
