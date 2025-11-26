import { useFlowStore } from "@/shared/store";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { HttpMethod, HttpNodeType } from "@/shared/ui/nodes/http";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface HttpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

interface HttpFormValues {
  method: HttpMethod;
  url: string;
  body: string;
}

export const HttpDialog = ({
  isOpen,
  onOpenChange,
  onClose,
}: HttpDialogProps) => {
  const { screenToFlowPosition } = useReactFlow();
  const addNode = useFlowStore((store) => store.addNode);

  const form = useForm<HttpFormValues>({
    defaultValues: {
      method: "GET",
      url: "https://example.com/api/v1",
      body: "",
    },
  });

  // const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });

  const onSubmit = form.handleSubmit((data) => {
    const node: HttpNodeType = {
      type: "http",
      id: uuidv4(),
      data: {
        method: data.method,
        url: data.url,
        status: "idle",
      },
      // TODO: get actual position
      position: {
        x: 0,
        y: 0,
      },
    };
    addNode(node);
    onClose();
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <form id="http-form" onSubmit={onSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>HTTP Request</DialogTitle>
            <DialogDescription>
              Configure the HTTP request node settings here.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2">
            <Controller
              control={form.control}
              name="method"
              render={({ field }) => (
                <Select
                  defaultValue="GET"
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              control={form.control}
              name="url"
              render={({ field }) => <Input {...field} id={field.name} />}
            />
          </div>

          <DialogFooter>
            <Button form="http-form">Add Request</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
