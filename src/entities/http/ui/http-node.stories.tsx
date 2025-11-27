import type { Meta, StoryObj } from "@storybook/react-vite";
import { HttpNode, HttpNodeType } from "./http-node";
import "@/index.css";
import { ReactFlowProvider } from "@xyflow/react";

const meta = {
  component: HttpNode,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ReactFlowProvider>
        <div className="w-[400px] h-[200px]">
          <Story />
        </div>
      </ReactFlowProvider>
    ),
  ],
} satisfies Meta<typeof HttpNode>;

export default meta;

type Story = StoryObj<Pick<HttpNodeType, "data">>;

export const Default: Story = {
  args: {
    data: {
      status: "idle",
      method: "GET",
      url: "https://api.example.com/api/v1",
    },
  },
};

export const Running: Story = {
  args: {
    data: {
      status: "running",
      info: "200 OK - 150ms",
      method: "POST",
      url: "https://api.example.com/api/v1",
    },
  },
};

export const Success: Story = {
  args: {
    data: {
      status: "success",
      info: "200 OK - 150ms",
      method: "PUT",
      url: "https://api.example.com/api/v1",
    },
  },
};

export const Error: Story = {
  args: {
    data: {
      status: "error",
      info: "404 Not Found - 150ms",
      method: "DELETE",
      url: "https://api.example.com/api/v1",
    },
  },
};
