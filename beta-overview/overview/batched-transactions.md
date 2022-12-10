---
description: >-
  Batched transactions allow users of the wallet to perform multiple
  transactions in one single on-chain transaction.
---

# 🦄 Batched Transactions

Contract based accounts have several advantages, including batched transactions. It allow users of the wallet to perform multiple transactions in _one single on-chain transaction_. This allows for an enhanced user experience.&#x20;

Example: no need to call both `approve` and `transferFrom` on an ERC20 token in two separate transactions.&#x20;

Contract based accounts who implement batched transactions can do so in a way that requires no changes to the contracts they interact with. In it’s simplest form, a batched transaction implementation is an array of `userOperation` that gets signed by the wallet owner.

Candide demonstrates batched transactions by integrating with Uniswap inside its application. Users are able to swap ERC-20 tokens in a single tap, without the need to call both `approve` and `transferFrom` in two separate transactions.&#x20;

#### Atomic Transactions

Candide supports atomic batched transactions by default. Take our previous example: If `transferFrom` failed, while `approve` is succeeded, the approval reverts. That doesn't leave any open ERC-20 approval on contract interactions and a safer dapp experience.&#x20;
