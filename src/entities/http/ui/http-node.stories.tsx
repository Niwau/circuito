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
      code: 200,
      method: "GET",
      url: "https://api.example.com/api/v1",
    },
  },
};

export const Running: Story = {
  args: {
    data: {
      status: "running",
      code: 200,
      method: "GET",
      url: "https://api.example.com/api/v1",
    },
  },
};

export const Success: Story = {
  args: {
    data: {
      status: "success",
      code: 200,
      method: "GET",
      url: "https://api.example.com/api/v1",
    },
  },
};

export const Error: Story = {
  args: {
    data: {
      status: "error",
      code: 404,
      method: "GET",
      url: "https://api.example.com/api/v1",
    },
  },
};

