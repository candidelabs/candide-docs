---
title: Intro
description: A new modular, developer-friendly and lighting-fast Python Bundler for Ethereum EIP-4337 Account Abstraction
image: "/img/erc4337-bundler.png"
---

# Introduction
Voltaire is a new modular, developer-friendly and lighting-fast Python Bundler for Ethereum EIP-4337 Account Abstraction. Voltaire is a fully open-source project designed to operate within the peer-to-peer mempool of UserOperations, facilitating the inclusion of transactions on-chain more quickly and efficiently.

The code is available for free on [Github](https://github.com/candidelabs/voltaire) under a permissive license for anyone to use without any strings attached. We encourage the community to fork it, contribute with docs, issues, pull requests, questions, or even try to break it.
<p align="center">
  <img src="/img/erc4337-bundler.png" />
</p>

## ERC-4337 Account Abstraction

ERC-4337 is designed to enable account abstraction without compromising on decentralization and censorship resistance. It strives to be as decentralized as the block production of the underlying chain. In practical terms, this means enabling access to smart contract wallets without depending on centralized relayers controlled by a single entity. 

The role of centralized relayers here is replaced with a p2p network of new entities called **Bundlers**.

## How Bundlers work

A Bundler running in a public mempool can be considered a block-builder, or an MEV searcher. As Account Abstraction gains adoption, an increasing part of user transactions would move into bundles. This means that most MEV opportunities will happen in bundles rather than blocks. Any block builder not partnering with a bundler (or becoming one) will be missing out on an increasing portion of the MEV. Bundlers will probably optimize for MEV and make the most of their profits over there.

### Bundlers role: 

- Users can propagate `UserOperations` to a network where any bundler can serve them
- Bundlers receive and deliver `UserOperations` to the EntryPoint contract but cannot change them

### UserOperation Flow

The flow of UserOperation can be thought of as the following, from a Bundler perspective:

1. Wallet Client Software send single `UserOperations` type to Bundlers
2. Bundlers keep pending UserOps in memory and share them between other nodes in the mempool
3. Bundlers send p2p message on every incoming UserOp
4. For efficiency, the p2p protocol support sending multiple userOps in single message - mostly for cases where a new bundler is brought online and synced with the network.
5. When it is time to create a bundle, each bundler is free to create a bundle of whatever size and order it likes - from zero to the entire mempool (given tx and block gas limits). This is where flashbot-api for searchers can be integrated.
6. The benefit of large bundles - is reduced overheads (the constant 21000, some more overhead of EntryPoint itself, and the variable reduction due to using "warm" addresses that are used between the different ops.

## Votlaire 

Voltaire presently has complete coverage of the test suite. While the specification is still under development, all upcoming updates will aim to sustain full compliance coverage.

As open-source developers, we looked at every Ethereum client implementation and considered different architectures and languages. So we decided to build Voltaire from scratch with the following criteria: Performance, Modularity, Developer friendly Language and Open Licensing.
