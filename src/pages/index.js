import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import homePageFeatures from '../homePageFeatures'
import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title} Docs for Developpers and Guides for using Wallet`}
      description="CANDIDE wallet is a smart contract wallet based on EIP-4337 Account Abstraction that provides Smart Accounts for end-users on Optimism"
    >
      <main>
        <div className={styles.container}>
          <div className={styles.row}>
            <HomepageFeatures columns={homePageFeatures} />
          </div>
        </div>
      </main>
    </Layout>
  )
}
