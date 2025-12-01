import { cn } from "@/shared/lib/utils";
import { NodeStatus } from "./node";

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

interface HttpInfoProps {
  status: NodeStatus;
  children: React.ReactNode;
}

export const HttpInfo = ({ children, status }: HttpInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-2 h-2 rounded-full", getDotColor(status))} />
      <span className="text-xs font-medium text-muted-foreground">
        {children}
      </span>
    </div>
  );
};
