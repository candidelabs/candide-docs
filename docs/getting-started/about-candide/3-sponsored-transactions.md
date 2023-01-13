---
description: Gass-less transactions through Paymasters
---

# Sponsored Transactions

A core functionality of Candide Contracts is the **Paymaster**. The Paymaster is a contract and a Service that can sponsor transactions on behalf of users for many purposes.

## Pay Gas in ERC-20

Generally, Ethereum transactions require ETH for paying transaction fees. With a **Paymaster**, users can pay transaction fees in several supported ERC20 tokens. This is realized via a transaction relay service (Paymaster) that accepts those tokens and submits the transactions to the blockchain, therefore paying the gas fee in ETH.

## Gasless Transactions

With the same functionality, users can submit transactions without paying any gas. CANDIDE, or other Dapps can pay transaction fees on behalf of a Candide Wallet via the Paymaster under certain conditions.

