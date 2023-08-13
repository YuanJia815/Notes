import type { SidebarConfig } from "vuepress-theme-gungnir";

export const zh: SidebarConfig = {
  "/notes/": [
    {
      text: "拔辣",
      link: "/notes/advanced/comment.md",
      children: [
        "/notes/basic/intro.md",
        
      ]
    },
    {
      text: "C/C++",
      children: [
        "/notes/C, C++/data-structure.md",
      ]
    },
  ]
};
