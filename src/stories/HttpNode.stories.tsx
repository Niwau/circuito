import type { Meta, StoryObj } from "@storybook/react-vite";
import { HttpNode, HttpNodeType } from "@/entities/http/ui/node";
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
      request: {
        method: "GET",
        url: "https://api.example.com/api/v1",
      },
    },
  },
};

export const Running: Story = {
  args: {
    data: {
      status: "running",
      request: {
        method: "POST",
        url: "https://api.example.com/api/v1",
      },
      response: {
        status: 200,
        millis: 150,
      },
    },
  },
};

export const Success: Story = {
  args: {
    data: {
      status: "success",
      request: {
        method: "PUT",
        url: "https://api.example.com/api/v1",
      },
      response: {
        status: 200,
        millis: 150,
      },
    },
  },
};

export const Error: Story = {
  args: {
    data: {
      status: "error",
      request: {
        method: "DELETE",
        url: "https://api.example.com/api/v1",
      },
      response: {
        status: 404,
        millis: 150,
      },
    },
  },
};
