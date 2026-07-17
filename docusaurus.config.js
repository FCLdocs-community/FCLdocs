const remarkWindowPlugin = require('./src/plugins/remarkWindowPlugin');

module.exports = {
  title: 'FCL新手文档',
  tagline: 'Documentation',
  url: 'https://example.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Fclce',
  projectName: 'FCL-website',

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
          editUrl: 'https://github.com/your-org/FCL-website/edit/main/',
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
          to: '/docs/intro',
          label: 'Docs',
          position: 'left',
        },
      ],
    },
  },

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
