---
description: Overview of problems and the technical solution behind Candide Wallet
---

# Overview

## Problems with wallets today 
Almost every wallet on Ethereum today have certain limitation in one way or the other. 

- Externally Owned Accounts (EOAs) come with the risk of lost or stolen seed phrases. They are limited in functionality in terms of logic, and cannot abstract away some complexities when interacting with Dapps.

- Contract-based wallets solve many of the issues that were raised with EOAs by offering specific wallet logic inside the contracts. Nevertheless, because each transaction on Ethereum needs to originate from an ECDSA-secured EOA makes this is very difficult to build; and scale. Dapps needs to adopt each contract interface for every smart contract wallet that wants to integrate, opposite to the standard EOA adopts. The high fees on Ethereum Mainnet make contract-based wallets very costly as well. 


## Introducing CANDIDE

*CANDIDE* is a smart contract wallet on Ethereum

## CANDIDE Special Features
#### No Seed Phrases | Contract-Based Recovery
CANDIDE hides seed phrases thanks to a system called Social Recovery. Users can recover their lost wallet by simply calling their set recovery contacts. We detail our chosen design for account recovery here.

### Bundled Transactions
Candide allows transactions to execute a sequence of transactions, which helps bring user-friendly Dapps. The common case for many smart contract interactions is 2 transactions: Approve ERC-20 spend + Spend. Users can sign once to commit to both transactions that can be signed one after the other atomically. More on Bundled Transactions

### Gas Abstraction

Candide allows users to pay network fees in ERC-20s with Paymasters. Upon signing up, users won't need to have ETH to deploy their smart contract-based wallet, and can simply deposit funds and transact without knowing the notion of gas payments in ETH. We detail our chosen paymaster design here.

## A Technicality in a nutshell

Users confirm the signing of the transaction. CANDIDE mobile client packages the transactions in a UserOperation that contains the necessary information about the sender, and the transactions, along with signatures and other data for verification. 

Candide extends the entry point logic to support paymasters that sponsor transactions for their users. Bundlers then package up a set of UserOperation objects into a single “bundle transaction”, then call handles on pre-published global entry point contracts. Users' transactions then get included in an Ethereum block. 
