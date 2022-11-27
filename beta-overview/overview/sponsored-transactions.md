---
description: Gassless transactions through Paymasters
---

# 🤝 Sponsored Transactions

A core functionality of Candide Contracts is the **Paymaster**. The Paymaster is a contract that can sponsor transactions on behalf of users for many purposes.&#x20;

Candide's Paymaster is currently able to do the following:&#x20;

### Pay Gas in ERC-20

Generally, Ethereum transactions require ETH for paying transaction fees. With a **Paymaster**, users can pay transaction fees in a number of supported ERC20 tokens. This is realized via a transaction relay service (Paymaster) that accepts those tokens and submits the transactions to the blockchain, therefore paying the gas fee in ETH.&#x20;

### Gasless Transactions

With the same functionality, users can submit transactions without paying any gas. Candide, or other Dapps can pay transaction fees on behalf of a Candide Wallet via the Paymaster under spefic conditions. &#x20;

