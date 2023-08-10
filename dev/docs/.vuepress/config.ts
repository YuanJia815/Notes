import { viteBundler } from "@vuepress/bundler-vite"
import { webpackBundler } from "@vuepress/bundler-webpack"
import { docsearchPlugin } from "@vuepress/plugin-docsearch"
import { defineUserConfig } from "vuepress"
import { gungnirTheme, i18n } from "vuepress-theme-gungnir"
import { mermaidPlugin }  from "@renovamen/vuepress-plugin-mermaid"
import { navbar, sidebar } from "./configs"// 從外部文件中引入導航欄和側邊欄配置

const isProd = process.env.NODE_ENV === "production"

export default defineUserConfig({// 定義並配置 VuePress 的使用者設定
  base: "/",// 設置基本 URL
  plugins: [mermaidPlugin()],

  head: [// head 配置，用於定義頁面的 <head> 元素內容，例如網頁標題、圖示等
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `/img/logo/favicon-16x16.png`
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `/img/logo/favicon-32x32.png`
      }
    ],
    ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
    ["meta", { name: "application-name", content: "Gungnir Theme" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Gungnir Theme" }],
    [
      "meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }
    ],
    [
      "link", { rel: "apple-touch-icon", href: `/img/logo/apple-touch-icon.png` }
    ],
    ["meta", { name: "theme-color", content: "#377bb5" }],
    ["meta", { name: "msapplication-TileColor", content: "#377bb5" }]
  ],

  // 網站語言配置
  locales: {
    "/": {
      lang: "zh-TW",
      title: "元嘉的網頁",
      description: "一個用於 VuePress 的部落格主題"
    }
  },

  // 透過環境變數配置打包工具
  bundler:
    process.env.DOCS_BUNDLER === "webpack" ? webpackBundler() : viteBundler(),
  // 配置預設主題
  theme: gungnirTheme({
    
    repo: "Renovamen/vuepress-theme-gungnir",
    docsDir: "docs",

    // 個人信息
    personalInfo: {
      name: "YuanJia",
      avatar: "/img/avatar.jpeg",
      description: "無聊",
      sns: {
        github: "YuanJia815",
        facebook: "profile.php?id=100001303909620",
        email: "C110152348@nkust.edu.tw",
        // 自定義的社交媒體
        bilibili: {
          icon: "ri-bilibili-line",
          link: "https://www.bilibili.com/"
        }
      }
    },

    // 首頁的頭部圖片
    homeHeaderImages: [
      {
        path: "/img/home-bg/3.gif",
        mask: "rgba(70, 6, 0, .1)"
      },
    ],

    // 其他頁面
    pages: {
      tags: {
        subtitle: "黑羊牆",
        bgImage: {
          path: "/img/pages/tags.jpg",
          mask: "rgba(211, 136, 37, .5)"
        }
      },
      links: {
        subtitle:
          "當你凝望著星空時，請將最亮的星星視為我靈魂中閃耀的星星。",
        bgImage: {
          path: "/img/pages/links.jpg",
          mask: "rgba(64, 118, 190, 0.5)"
        }
      }
    },

    // 主題級別的語言配置
    locales: {

      /* 英文語言配置 由於默認語言為英文，我們不需要設置所有的語言字段 */
      "/": {     
        navbar: navbar.zh,// 導航欄 
        sidebar: sidebar.zh, // 側邊欄    
        navbarTitle: "YuanJia",
      },

      /* 繁體中文語言配置 */
      "/zh/": {    
        navbar: navbar.en,// 導航欄      
        sidebar: sidebar.en// 側邊欄
      }
    },

    themePlugins: { // 只在生產環境中啟用 git 插件  
      git: isProd,
      katex: true,
      mermaid: {
        theme: "default",
        darkTheme: "dark" 
      },
      chartjs: true,
      giscus: {
        repo: "This-is-an-Apple/gitalk-comments",
        repoId: "MDEwOlJlcG9zaXRvcnkyMTA1MjQyMTQ=",
        category: "Announcements",
        categoryId: "DIC_kwDODIxYNs4CAO1u",
        lazyLoad: true
      },
      mdPlus: {
        all: true
      },
      ga: "G-EE8M2S3MPB",
      ba: "10b7bc420625758a319d6b23aed4700f",
      rss: {
        siteURL: "https://v2.vuepress-theme-gungnir.vercel.app",
        copyright: "Renovamen 2018-2022"
      },
      pwa: true,
      //search: false // 使用 @vuepress/plugin-docsearch 替代
    },

    footer: `
      &copy; <a href="https://github.com/YuanJia815" target="_blank">YuanJia Zhong 2003</a>
      <br>
      Base - <a href="https://v2.vuepress.vuejs.org" target="_blank">VuePress</a> &
      <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank">Gungnir</a>
    `
  }),

  markdown: {
    headers: {
      level: [2, 3, 4, 5]
    }
  },

});
