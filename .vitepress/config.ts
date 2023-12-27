import { createRequire } from 'module'
import { defineConfig, type DefaultTheme } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('../packages/core/package.json')
const rootPkg = require('../package.json')

const GUIDES: DefaultTheme.NavItemWithLink[] = [
  { text: 'About', link: 'docs/About' },
  { text: 'Installation', link: 'docs/Installation' },
  { text: 'Quick Start', link: 'docs/QuickStart' },
  { text: 'CLI', link: 'docs/CLI' },
  { text: 'Tool', link: 'docs/TheTool' },
  { text: 'Pipeline', link: 'docs/PipelineInsight' },
  { text: 'Directory pattern', link: 'docs/FastGlobPatternSyntax' },
  { text: 'Make documentation', link: 'docs/DocumentationByAI' },
  { text: 'Why not Typescript', link: 'docs/WhyNoTypescript' },
  { text: 'Contributing', link: '../CONTRIBUTING' },
]

const TOOLS: DefaultTheme.NavItemWithLink[] = rootPkg.workspaces.filter(e => e !== 'packages/cli' && e !== 'packages/core').map((p: string) => {
  const pkg = require(`../${p}/package.json`)
  return { text: pkg.name.replace('@toolx/', ''), link: `/${p}/README.md` }
})


const API: DefaultTheme.NavItemWithLink[] = [
  { text: 'Base.js', link: 'packages/core/Base.md' },
  { text: 'Pipeline.js', link: 'packages/core/Pipeline.md' },
  { text: 'Tool.server.js', link: 'packages/core/Tool.server.md' },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: "ToolX",
  description: "Documentation",
  lastUpdated: true,
  cleanUrls: true,
  base: '/dist/',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/toolx-logo.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'ToolX' }],
    // ['meta', { name: 'og:image', content: 'https://vitepress.dev/vitepress-og.jpg' }],
  ],
  markdown: {
      // Extend markdown-it
      config: (md) => {
        // Custom rule for transforming links
        const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options);
        };
  
        md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
          const token = tokens[idx];
          const hrefIndex = token.attrIndex('href');
          if (hrefIndex >= 0) {
            const hrefAttr = token.attrs?.[hrefIndex];
            const url = hrefAttr?.[1];
            if (url && url.startsWith('https://github.com/toolx-dev/toolx/blob/main/')) {
              hrefAttr[1] = url.replace('https://github.com/toolx-dev/toolx/blob/main/', '/');
            }
          }
          return defaultRender(tokens, idx, options, env, self);
        };

        const originalRender = md.render;
        md.render = function(src, env) {
          if (!src.startsWith('---')) {
            src = '---\noutline: deep\n---\n' + src;
          }
          return originalRender.call(this, src, env);
        };
      }
  },
  themeConfig: {
    logo: { src: '/toolx-logo.png', width: 24, height: 24 },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: 'Quick start',
        link: '/docs/QuickStart',
        activeMatch: '/docs/QuickStart'
      },
      {
        text: 'Tools',
        items: [
          {
            items: TOOLS,
          },
        ],
      },
      {
        text: 'Guide',
        items: [
          {
            items: GUIDES,
          },
        ],
      },
      {
        text: 'API',
        items: [
          {
            items: API,
          },
        ],
      },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: 'Contributing',
            link: 'https://github.com/toolx-dev/toolx/blob/main/CONTRIBUTING.md'
          }
        ]
      }
    ],

    editLink: {
      pattern: 'https://github.com/toolx-dev/toolx/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },

    sidebar: Object.assign(
      {},
      {
        '/': [
          {
            text: 'Guide',
            items: GUIDES,
          },
          {
            text: 'Tools',
            items: TOOLS,
          },
          {
            text: 'API',
            items: API,
          },
        ],
      },
    ),

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/toolx-dev' }
    ],
    footer: {
      message: 'Released primarily under the MIT license.',
      copyright: 'Copyright © 2023-present William Manco'
    },
  }
})


