import { Category } from "@/domain/models";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CategoryTree from "./CategoryTree";

const meta = {
  title: "CategoryTree",
  component: CategoryTree,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    parentCategory: {
      control: "object",
      description: "The parent category",
    },
    childCategories: {
      control: "object",
      description: "The child categories",
    },
  },
} satisfies Meta<typeof CategoryTree>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default state of the CategoryTree with a simple category family
 */
export const Default: Story = {
  args: {
    parentCategory: new Category({
      id: "test-id",
      name: "Sample",
      description: "This is sample description",
      content: "Sample content goes here.",
    }),
    childCategories: [
      new Category({
        id: "test-id",
        name: "Sample Child",
        description: "This is sample description",
        content: "Sample content goes here.",
      }),
      new Category({
        id: "test-id",
        name: "Sample Child",
        description: "This is sample description",
        content: "Sample content goes here.",
      }),
      new Category({
        id: "test-id",
        name: "Sample Child",
        description: "This is sample description",
        content: "Sample content goes here.",
      }),
    ],
  },
};
