import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Strata',
  tagline: 'Technical docs at the depth you choose.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://johnnyoy.github.io',
  baseUrl: '/strata/',

  organizationName: 'johnnyoy',
  projectName: 'strata',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/strata-social.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Strata',
      logo: {
        alt: 'Strata logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'custom-depthToggle',
          position: 'right',
        },
        {
          href: 'https://github.com/johnnyoy/strata',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Topics',
          items: [
            {label: 'Git', to: '/docs/git'},
            {label: 'Docker', to: '/docs/docker'},
            {label: 'Linux', to: '/docs/linux'},
            {label: 'JavaScript', to: '/docs/javascript'},
            {label: 'SQL', to: '/docs/sql'},
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'How depth works',
              to: '/docs/about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/johnnyoy/strata',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Strata. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'docker', 'sql', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
