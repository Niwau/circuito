import { cn } from "@/shared/lib/utils";
import { useFlowStore } from "@/shared/store";
import { Button } from "@/shared/ui/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/card";
import { HttpMethodSelector } from "@/entities/http/ui/method-selector";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Play } from "lucide-react";
import { ChangeEvent, useCallback } from "react";
import { HttpInfo } from "./info";
import { HttpMethod, HttpRequest, HttpResponse } from "../models";

export type NodeStatus = "idle" | "running" | "success" | "error";

export type HttpNodeProps = {
  status?: NodeStatus;
  className?: string;
  request: HttpRequest;
  response?: HttpResponse;
};

export type HttpNodeType = Node<HttpNodeProps>;

export const HttpNode = ({
  id,
  data: { className, status = "idle", request, response },
}: NodeProps<HttpNodeType>) => {
  const setNode = useFlowStore((store) => store.setNode);
  const runNode = useFlowStore((store) => store.runNode);

  const setMethod = useCallback(
    (value: HttpMethod) => {
      setNode(id, { request: { ...request, method: value } });
    },
    [id],
  );

  const setURL = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNode(id, { request: { ...request, url: e.target.value } });
    },
    [id],
  );

  const isRunning = status === "running";

  const onPlayClick = useCallback(() => {
    runNode(id);
  }, []);

  return (
    <Card
      className={cn(
        "min-w-100 resize",
        className,
        isRunning ? "animate-pulse" : "",
      )}
    >
      <CardHeader>
        <Handle type="target" position={Position.Left} />
        <div className="flex gap-2">
          <HttpMethodSelector method={request.method} setMethod={setMethod} />
          <Input value={request.url} onChange={setURL} />
        </div>
        <Handle type="source" position={Position.Right} />
      </CardHeader>

      <Separator />

      <CardFooter>
        {response && (
          <HttpInfo status={status}>
            {response.status} - {response.millis} ms
          </HttpInfo>
        )}

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
