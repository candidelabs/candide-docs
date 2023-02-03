/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure

  // But you can create a sidebar manually
  developSideBar: [
    'develop/getting-started',
    {
      type: 'category',
      label: 'Wallet',
      items: [
        'develop/wallet/connect-wallet',
        'develop/wallet/batch-transactions',
        'develop/wallet/network-support',
        'develop/wallet/gasless-transactions',
        'develop/wallet/session-keys'
      ],
    },
  ],
  gettingStartedSideBar: [
    'getting-started/intro',
    {
      type: 'category',
      label: 'About CANDIDE',
      items: [
        'getting-started/about-candide/overview',
        'getting-started/about-candide/account-abstraction',
        'getting-started/about-candide/sponsored-transactions',
        'getting-started/about-candide/batched-transactions',
        'getting-started/about-candide/modules',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'getting-started/guides/setup-a-wallet',
        'getting-started/guides/deposit-funds',
        'getting-started/guides/add-recovery-contacts',
        'getting-started/guides/recover-your-account',
        'getting-started/guides/help-recover-an-account',
      ],
    },
  ]
};

module.exports = sidebars;