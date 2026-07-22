const remarkWindowPlugin = require('./src/plugins/remarkWindowPlugin');

module.exports = {
  title: 'FCL新手文档',
  tagline: 'Documentation',
  url: 'https://fcldocs.top',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  favicon: 'img/favicon.ico',
  organizationName: 'Fcl-community',
  projectName: 'FCLdocs',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/FCLdocs-community/FCLdocs/edit/main/',
          // 添加以下配置
          remarkPlugins: [remarkWindowPlugin],
        },
        blog: {
          showReadingTime: true,
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: "/docs",
        blogRouteBasePath: "/blog",
        language: ["zh" , "en"],
        hashed: true,
        highlightSearchTermsOnTargetPage: false,
        searchResultLimits: 10,
        searchResultContextMaxLength: 50,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'FCL 教程',
      items: [
        {
          to: '/docs',
          label: 'FCL 教程文档',
          position: 'left',
        },
        {
          to: 'https://github.com/FCL-Team/FoldCraftLauncher',
          label: 'FCL 代码仓库',
          position: 'left',
        },
        {
          to: 'https://foldcraftlauncher.cn',
          label: 'FCL 下载站(非官方)',
          position: 'left',
        },
        {
          to: '/about',
          label: '关于本站',
          position: 'left',
        },
        {
          to: '/blog',
          label: '更新内容',
          position: 'left',
        },
      ],
    },
  },

  // 首屏加载覆盖层：内联进 HTML，JS bundle 加载完成前就显示，
  // 由 src/clientModules/loadingOverlay.js 在资源就绪后淡出移除
  headTags: [
    // P0: 背景层 + 加载覆盖层样式，内联不受 webpack/css-minimizer 处理
    {
      tagName: 'style',
      attributes: {},
      innerHTML: `
        /* 背景层：fixed div + gradient overlay + 底图 */
        #fcl-site-bg {
          position: fixed; inset: 0; z-index: -1;
          background:
            linear-gradient(rgba(255,255,255,0.15), rgba(255,255,255,0.15)),
            url('/img/bj/樱花-浅.png') center / cover no-repeat;
        }
        html[data-theme='dark'] #fcl-site-bg {
          background:
            linear-gradient(rgba(13,15,20,0.25), rgba(13,15,20,0.25)),
            url('/img/bj/樱花-暗.png') center / cover no-repeat;
        }

        /* 加载覆盖层 */
        #fcl-loading-overlay {
          position: fixed; inset: 0; z-index: 99999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: #0d0f14; color: #e8e8e8;
          transition: opacity 0.35s ease;
          will-change: opacity;
        }
        #fcl-loading-overlay[data-theme='light'] {
          background: #ffffff; color: #1c1e21;
        }
        #fcl-loading-overlay.fcl-loading-hidden {
          opacity: 0; pointer-events: none;
        }
        #fcl-loading-overlay .fcl-loading-spinner {
          width: 42px; height: 42px; border-radius: 50%;
          border: 3px solid rgba(128,128,128,0.3);
          border-top-color: #25c2a0;
          animation: fcl-loading-spin 0.8s linear infinite;
        }
        #fcl-loading-overlay .fcl-loading-text {
          margin-top: 14px; font-size: 15px;
          font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
          letter-spacing: 2px; opacity: 0.8;
        }
        @keyframes fcl-loading-spin { to { transform: rotate(360deg); } }
      `,
    },
    // P0: 同步创建背景层（所有页面）+ 加载覆盖层（仅首页）
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        (function () {
          var theme = 'dark';
          try { theme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
          document.documentElement.setAttribute('data-theme', theme);

          // 背景层：所有页面都需要
          var bg = document.createElement('div');
          bg.id = 'fcl-site-bg';
          document.documentElement.appendChild(bg);

          // 加载覆盖层：仅首页
          if (location.pathname === '/') {
            var overlay = document.createElement('div');
            overlay.id = 'fcl-loading-overlay';
            overlay.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
            overlay.innerHTML =
              '<div class="fcl-loading-spinner"></div>' +
              '<div class="fcl-loading-text">FCL 新手文档</div>';
            (document.body || document.documentElement).appendChild(overlay);
          }
        })();
      `,
    },
  ],

  // P2: 移除逻辑放 client module，晚点没关系
  clientModules: [require.resolve('./src/clientModules/loadingOverlay.js')],

  plugins: [
    function DisableWatchPlugin(context, options) {
      return {
        name: 'disable-watch-plugin',
        configureWebpack(config, isServer, utils) {
          return {
            watchOptions: {
              poll: 1000,
              ignored: ['**/node_modules/**', '/data/**', '/data/data/**', '/**'],
            },
          };
        },
      };
    },
  ],
};
