const { visit } = require('unist-util-visit');

function remarkTermPlugin() {
  return (tree) => {
    visit(tree, 'link', (node, index, parent) => {
      if (!node.url || !node.url.startsWith('window:')) return;

      const raw = node.url.replace(/^window:/, '');

      // 最后一个 # 后面是颜色 hex
      const hashIndex = raw.lastIndexOf('#');
      let path, color;

      if (hashIndex === -1) {
        path = raw;
        color = 'var(--ifm-color-primary)';
      } else {
        path = raw.slice(0, hashIndex);
        color = raw.slice(hashIndex + 1);

        // 校验是否是 6 位 hex（兼容带 # 和不带 #）
        const hexRegex = /^#?[0-9a-fA-F]{6}$/;
        if (!hexRegex.test(color)) {
          // 不是有效颜色，回退
          path = raw;
          color = 'var(--ifm-color-primary)';
        }
      }

      // 自动补全 .md
      const mdPath = path.endsWith('.md') ? path : `${path}.md`;

      const text = node.children
        .map(child => child.value || '')
        .join('');

      const jsxNode = {
        type: 'mdxJsxTextElement',
        name: 'TermLink',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'path', value: mdPath },
          { type: 'mdxJsxAttribute', name: 'color', value: color },
        ],
        children: [{ type: 'text', value: text }],
      };

      parent.children.splice(index, 1, jsxNode);
      return index;
    });
  };
}

module.exports = remarkTermPlugin;
