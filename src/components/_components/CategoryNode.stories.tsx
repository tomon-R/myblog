import { Category } from "@/domain/models";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CategoryNode from "./CategoryNode";

const meta = {
  title: "CategoryNode",
  component: CategoryNode,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    category: {
      control: "object",
      description: "The category to display",
    },
  },
} satisfies Meta<typeof CategoryNode>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default state of the CategoryNode with a simple category
 */
export const Default: Story = {
  args: {
    category: new Category({
      id: "test-id",
      name: "Sample",
      description: "This is sample description",
      content: "Sample content goes here.",
    }),
  },
};
