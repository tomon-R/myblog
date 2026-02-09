import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Header from "./Header";

const meta = {
  title: "Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    appName: "My Blog",
    navigationItems: [
      { link: "/about", label: "About" },
      { link: "/categories", label: "Categories" },
      { link: "/posts", label: "Posts" },
    ],
  },
};

export const SingleNavItem: Story = {
  args: {
    appName: "My Blog",
    navigationItems: [{ link: "/about", label: "About" }],
  },
};

export const NoNavItems: Story = {
  args: {
    appName: "My Blog",
    navigationItems: [],
  },
};
