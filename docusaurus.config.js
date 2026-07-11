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

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/your-org/FCL-website/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
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
              // 使用 polling 代替原生监听（Termux 兼容更好）
              poll: 1000,
              // 忽略无权限的父目录
              ignored: ['**/node_modules/**', '/data/**', '/data/data/**', '/**'],
            },
          };
        },
      };
    },
  ],
};
