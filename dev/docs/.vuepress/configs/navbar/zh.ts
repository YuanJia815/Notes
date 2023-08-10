import type { NavbarConfig } from "vuepress-theme-gungnir";
import { version } from "../meta";

export const zh: NavbarConfig = [
  {
    text: "Home",
    link: "/",
    icon: "fa-fort-awesome"
  },
  {
    text: "Tag",
    link: "/tags/",
    icon: "fa-tag"
  },
  {
    text: "連結",
    link: "/links/",
    icon: "fa-satellite-dish"
  },
  {
    text: "文檔",
    link: "/zh/docs/basic/intro.md",
    icon: "ri-book-2-fill"
  },
  {
    text: `list`,
    icon: "co-git",
    children: [
      {
        text: "GitHub",
        link: "https://github.com/YuanJia815",
        icon: "ri-github-line"
      },
    ]
  }
];
