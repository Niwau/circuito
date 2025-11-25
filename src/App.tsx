import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FlowEditor } from "./widgets/flow-editor";
import "./index.css";

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}
