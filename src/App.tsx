import { ReactFlowProvider } from "@xyflow/react";
import { FlowEditor } from "@/widgets/editor/ui";
import { ThemeProvider } from "./shared/providers/theme-provider";
import "@xyflow/react/dist/style.css";
import "./index.css";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="circuito-theme">
      <ReactFlowProvider>
        <FlowEditor />
      </ReactFlowProvider>
    </ThemeProvider>
  );
}
