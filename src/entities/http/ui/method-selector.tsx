import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select";

import { cn } from "../../../shared/lib/utils";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface HttpMethodSelectorProps {
  method: HttpMethod;
  setMethod: (method: HttpMethod) => void;
}

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "!bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "POST":
      return "!bg-yellow-100/20 text-yellow-400 border-yellow-500/30";
    case "DELETE":
      return "!bg-red-500/20 text-red-400 border-red-500/30";
    case "PUT":
      return "!bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "PATCH":
      return "!bg-cyan-200/20 text-cyan-400 border-cyan-500/30";
    default:
      return "!bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export const HttpMethodSelector = ({
  method,
  setMethod,
}: HttpMethodSelectorProps) => {
  return (
    <Select value={method} onValueChange={setMethod}>
      <SelectTrigger
        className={cn(getMethodColor(method), "text-xs font-semibold border")}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="GET">GET</SelectItem>
        <SelectItem value="POST">POST</SelectItem>
        <SelectItem value="DELETE">DELETE</SelectItem>
        <SelectItem value="PUT">PUT</SelectItem>
        <SelectItem value="PATCH">PATCH</SelectItem>
      </SelectContent>
    </Select>
  );
};
