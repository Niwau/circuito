import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FlowEditor } from "./widgets/flow-editor";
import "./index.css";
import { ThemeProvider } from "./shared/providers/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="circuito-theme">
      <ReactFlowProvider>
        <FlowEditor />
      </ReactFlowProvider>
    </ThemeProvider>
  );
}
