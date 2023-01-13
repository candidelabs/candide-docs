---
description: >-
  Bundled transactions allow users of the wallet to perform multiple
  transactions in one single on-chain transaction.
---

# Batched Transactions
Contract-based accounts have several advantages, including batched transactions. It allows users of the wallet to perform multiple transactions in _one single on-chain transaction_. This allows for an enhanced user experience.

Example: no need to call both `approve` and `transferFrom` on an ERC20 token in two separate transactions.

Contract-based accounts that implement batched transactions can do so in a way that requires no changes to the contracts they interact with. In its simplest form, a batched transaction implementation is an array of `UserOperation` that gets signed by the wallet owner.

CANDIDE mobile wallet uses bundled transactions by integrating with Uniswap inside its application. Users can swap ERC-20 tokens in a single tap, without the need to call both `approve` and `transferFrom` in two separate transactions.

Bundled transactions in CANDIDE wallet are atomic by default. Take our previous example: If `transferFrom` failed, while `approve` succeeded, the approval does not revert. Atomic transactions allow reverting `UserOpeartions` if a single one of them failed. That doesn't leave any open ERC-20 approval on contract interactions and a safer Dapp experience.

