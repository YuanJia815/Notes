import type { SidebarConfig } from "vuepress-theme-gungnir";

export const zh: SidebarConfig = {
  "/notes/": [
    {
      text: "拔辣",
      children: [
        "/notes/basic/intro.md",
        "/notes/basic/linked-list_binary-tree.md",
      ]
    },
    {
      text: "蓮霧",
      children: [
        "/notes/advanced/comment.md",
      ]
    },
  ]
};
