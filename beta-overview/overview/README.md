---
description: Overview of problems and the technical solution behind Candide Wallet
---

# 🌎 Overview

### Problems with wallets today&#x20;

Almost every wallet on Ethereum today have certain limitation in one way or the other.&#x20;

* Externally Owned Account (EOA) come with the risk of lost or stolen seedphrases. They are limited in functionality in terms of logic, and cannot abstract away some complexities when intercting with dapps.&#x20;
* Contract based wallets solves many of the issues that were raised with EOAs by offering specific wallet logic inside the contracts. Nevertheless, because of the fact that each transaction on Ethereum needs to originate from an ECDSA-secured EOA makes this very difficult to build, neverthelss scaled. Dapps needs to adopt each contract interface for every smart contract wallet that wants to integrate, opposite to the standard EOA adopts. The high fees on Ethereum Mainnet makes contract based wallets very costly as well.&#x20;

### Introducing Candide Beta

![](../../.gitbook/assets/logo.png)

Candide Beta is a contract based wallet on Ethereum. It is build on top on ERC-4337 as a standard interface for the global contracts named [Entry Point](https://github.com/eth-infinitism/account-abstraction/blob/main/contracts/EntryPoint.sol). These set of contracts alleviate much of the heavy lift security burden to ensure safety is done not in the wallet itself, but in the entry point contracts.&#x20;

> ERC-4337 is a collaboration by [Infinitism](https://github.com/eth-infinitism/account-abstraction), a collaboration between [Nethermind](https://nethermind.io/account-abstraction/), [Opengsn](https://opengsn.org/) and [Ethereum Foundation](https://ethereum.foundation/). Their contracts have been [audited by OpenZepplin](https://blog.openzeppelin.com/eth-foundation-account-abstraction-audit/).  &#x20;

Candide Beta infrastructure is started based off of a fork of [Stackup](https://github.com/stackupfinance/stackup) great effort in developing a client native app on Polygon. Candide has made several changes to the Stackup codebase, all of which were thoughtfully chosen to ensure that the wallet would carry out the original intended mechanism of allowing users to _get the best experience possible for an Ethereum Wallet._&#x20;

### Candide Beta Features

#### No Seed Phrases | Account Recovery

Candide hides seedphrases thanks to a system called Social Recovery, which was popularized by the Argent Team. Users can recover their lost wallet by simply calling their set guardians, an experience similar to what banks offer today, except that it is fully self-custodial. We detail our chosen design for account recovery [here](account-recovery.md).

#### Multi-calls

Candide will allow batched transactions to execute a sequence of transactions, which helps bring user friendly dapps. The common case for many smart contract interactions are 2 transactions: Approve ERC-20 spend + Spend. Instead, users can sign once to commit to both transactions that can be signed one after the other atomically. Candide Beta ships with an integrated Uniswap Dapp that showcase a one tap swap for ERC-20.

#### Transfer

Candide Beta will allow transfers of ETH and ERC-20, a similar experience that most wallets offer today.

#### Gas Abstraction

Candide will have a paymaster for users to pay gas in any ERC-20. Upon signing up, users won't need to have ETH to deploy their smart contract based wallet, and can simple deposit funds and transact without knowing the notion of gas payments in ETH. We details our chosen paymaster design [here](sponsored-transactions.md).

### Technicality in a nutshell

* Users confirm the signing of the transaction they want to do through Candide Beta. Candide then packages the transactions in a UserOperation that contains the necessary information about the sender, the transactions, along with signatures and other data for verification.&#x20;
* Candide extends the entry point logic to support paymasters that sponsor transactions for its own users. Our paymaster is used to subsidize fees for the wallet deployment, and allow users to pay fees with ERC20 tokens. From there, either miners or bundlers can package up a set of UserOperation objects into a single “bundle transaction”, which then gets included into an Ethereum block.&#x20;
* Candide runs its own bundler to package UserOperation as a service for its own wallet. The bundler packages up multiple UserOperation objects into a single handleOps call to the pre-published global entry point contract.
