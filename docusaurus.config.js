const remarkWindowPlugin = require('./src/plugins/remarkWindowPlugin');

module.exports = {
  title: 'FCL新手文档',
  tagline: 'Documentation',
  url: 'https://fcldocs.top',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
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
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],


  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'FCL教程',
      items: [
        {
          to: '/docs',
          label: 'Docs',
          position: 'left',
        },
      ],
    },
  },

  // 首屏加载覆盖层：内联进 HTML，JS bundle 加载完成前就显示，
  // 由 src/clientModules/loadingOverlay.js 在资源就绪后淡出移除
  headTags: [
    {
      tagName: 'style',
      attributes: {},
      innerHTML: `
#fcl-loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0d0f14;
  color: #e8e8e8;
  transition: opacity 0.35s ease;
}
#fcl-loading-overlay[data-theme='light'] {
  background: #ffffff;
  color: #1c1e21;
}
#fcl-loading-overlay.fcl-loading-hidden {
  opacity: 0;
  pointer-events: none;
}
#fcl-loading-overlay .fcl-loading-spinner {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 3px solid rgba(128, 128, 128, 0.3);
  border-top-color: #25c2a0;
  animation: fcl-loading-spin 0.8s linear infinite;
}
#fcl-loading-overlay .fcl-loading-text {
  margin-top: 14px;
  font-size: 15px;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  letter-spacing: 2px;
  opacity: 0.8;
}
@keyframes fcl-loading-spin {
  to { transform: rotate(360deg); }
}
`,
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function () {
  var theme = 'dark';
  try {
    theme = localStorage.getItem('theme') || 'dark';
  } catch (e) {}
  var overlay = document.createElement('div');
  overlay.id = 'fcl-loading-overlay';
  overlay.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
  overlay.innerHTML =
    '<div class="fcl-loading-spinner"></div>' +
    '<div class="fcl-loading-text">FCL 新手文档</div>';
  (document.body || document.documentElement).appendChild(overlay);
})();
`,
    },
  ],

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
