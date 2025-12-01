import type { Meta, StoryObj } from "@storybook/react-vite";
import { HttpDialog } from "@/entities/http/ui/dialog";
import "@/index.css";

const meta = {
  component: HttpDialog,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof HttpDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const responseBody = {
  id: 123,
  name: "John Doe",
  email: "john@email.com",
  createdAt: "2023-01-01T12:00:00Z",
};

export const Default: Story = {
  args: {
    request: {
      method: "GET",
      body: undefined,
      url: "https://api.example.com/users/123",
    },
    response: {
      status: 200,
      body: JSON.stringify(responseBody, null, 2),
      headers: undefined,
      millis: 150,
    },
  },
};
