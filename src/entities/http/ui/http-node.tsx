import { cn } from "@/shared/lib/utils";
import { useFlowStore } from "@/shared/store";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Separator } from "@/shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Play } from "lucide-react";
import { ChangeEvent, useCallback } from "react";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type NodeStatus = "idle" | "running" | "success" | "error";

export type HttpNodeProps = {
  url?: string;
  className?: string;
  info?: string;
  method?: HttpMethod;
  status?: NodeStatus;
};

export type HttpNodeType = Node<HttpNodeProps>;

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "POST":
      return "bg-yellow-100/20 text-yellow-400 border-yellow-500/30";
    case "DELETE":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "PUT":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "PATCH":
      return "bg-cyan-200/20 text-cyan-400 border-cyan-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const getDotColor = (status: NodeStatus) => {
  switch (status) {
    case "idle":
      return "hidden";
    case "running":
      return "bg-yellow-500";
    case "success":
      return "bg-green-500";
    case "error":
      return "bg-red-500";
  }
};

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

export const HttpNode = ({
  id,
  data: {
    className,
    method = "GET",
    url = "https://api.example.com/api/v1",
    info,
    status = "idle",
  },
}: NodeProps<HttpNodeType>) => {
  const setNode = useFlowStore((store) => store.setNode);
  const runNode = useFlowStore((store) => store.runNode);

  const setMethod = useCallback(
    (value: HttpMethod) => {
      setNode(id, { method: value });
    },
    [id],
  );

  const setURL = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNode(id, { url: e.target.value });
    },
    [id],
  );

  const isRunning = status === "running";

  const onPlayClick = useCallback(() => {
    runNode(id);
  }, []);

  return (
    <Card
      className={cn("min-w-100", className, isRunning ? "animate-pulse" : "")}
    >
      <CardHeader>
        <Handle type="target" position={Position.Left} />
        <div className="flex gap-2">
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger
              className={cn(
                "w-24 h-8 text-xs font-semibold border px-2",
                getMethodColor(method),
              )}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {methods.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input value={url} onChange={setURL} />
        </div>
        <Handle type="source" position={Position.Right} />
      </CardHeader>

      <CardContent>
        <div className="p-3">
          <Tabs defaultValue="params" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-8 bg-muted p-1 mb-3">
              <TabsTrigger value="params" className="text-xs h-6">
                Params
              </TabsTrigger>
              <TabsTrigger value="headers" className="text-xs h-6">
                Headers
              </TabsTrigger>
              <TabsTrigger value="body" className="text-xs h-6">
                Body
              </TabsTrigger>
              <TabsTrigger value="auth" className="text-xs h-6">
                Auth
              </TabsTrigger>
            </TabsList>

            {/* Params Tab */}
            <TabsContent
              value="params"
              className="text-xs text-muted-foreground text-center py-4"
            >
              Params configuration
            </TabsContent>

            {/* Headers Tab */}
            <TabsContent
              value="headers"
              className="text-xs text-muted-foreground text-center py-4"
            >
              Headers configuration
            </TabsContent>

            {/* Body Tab */}
            <TabsContent
              value="body"
              className="text-xs text-muted-foreground text-center py-4"
            >
              Request body
            </TabsContent>

            {/* Auth Tab */}
            <TabsContent
              value="auth"
              className="text-xs text-muted-foreground text-center py-4"
            >
              Authentication settings
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>

      <Separator />

      <CardFooter>
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", getDotColor(status))} />
          <span className="text-xs font-medium text-muted-foreground">
            {info}
          </span>
        </div>

        <Button
          onClick={onPlayClick}
          size="sm"
          className="ml-auto"
          variant={isRunning ? "outline" : "default"}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <div className="w-3 h-3 border-2 border-transparent border-t-current rounded-full animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play />
              Run
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
