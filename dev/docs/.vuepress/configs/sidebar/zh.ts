import type { SidebarConfig } from "vuepress-theme-gungnir";

export const zh: SidebarConfig = {
  "/zh/docs/": [
    {
      text: "拔辣",
      children: [
        "/zh/docs/basic/intro.md",
        "/zh/docs/basic/installation.md",
      ]
    },
    {
      text: "蓮霧",
      children: [
        "/zh/docs/advanced/comment.md",
      ]
    },
  ]
};
