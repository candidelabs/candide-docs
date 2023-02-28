// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CANDIDE Docs',
  tagline: 'Smart contract wallets are cool',
  url: 'https://docs.candidewallet.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Candide Labs', // Usually your GitHub org/user name.
  projectName: 'candide-docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/candidelabs/candide-docs/edit/master/website',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'CANDIDE',
        logo: {
          alt: 'CANDIDE logo',
          src: 'img/logo-dark.png',
        },
        items: [
          {
            to: 'getting-started/intro',
            position: 'left',
            label: 'Getting Started',
          },
          {
            to: 'develop/getting-started',
            position: 'left',
            label: 'Develop',
          },
          {
            to: 'security/security-home',
            position: 'left',
            label: 'Security',
          },
        ],
      },
      footer: {
        links: [
          {
            "title": "Github",
            "items": [
              {
                "label": "Mobile Client App",
                "href": "https://github.com/candidelabs/candide-mobile-app"
              },
              {
                "label": "Contracts",
                "href": "https://github.com/candidelabs/CandideWalletContracts"
              },
              {
                "label": "Bundler and Paymaster",
                "href": "https://github.com/candidelabs/Candide-bundler-and-paymaster-RPC"
              },
              {
                "label": "Security Center Webpage",
                "href": "https://github.com/candidelabs/candide-mobile-app"
              },
            ],
          },
          {
            "title": "Community",
            "items": [
              {
                "label": "Discord",
                "href": "https://discord.gg/Q8B6WJ2MvT"
              },
              {
                "label": "Twitter",
                "href": "https://twitter.com/candidewallet"
              },
              {
                "label": "Medium",
                "href": "https://medium.com/@candidelabs"
              },
              {
                "label": "Website",
                "href": "https://candidewallet.com"
              }
            ]
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
