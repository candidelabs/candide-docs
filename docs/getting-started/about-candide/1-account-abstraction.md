---
description: Candide is a smart contract wallet
cover: ../../.gitbook/assets/ERC-4337 and gnosis.jpg
coverY: 0
---

# Account Abstraction

Candide is a `contract`-based wallet. If you have ever had a wallet on Ethereum, you are most likely to have used an EOA (`Externally Owned Account`). That's the built-in Account type on Ethereum that is used by most popular wallet services like MetaMask, Rainbow, and Ledger.

A contract-based wallet is, well you guessed it, a `smart contract`. In essence, your contract wallet is controlled and separated by a signer. This is where the name Account Abstraction comes in. The Account is abstracted away from the signer.

## Externally Owned Account vs Contract Accounts
### EOA
Users own an EOA through a `Signer` that consists of two keys:

* A public key — The address of the account is derived from it
* A private key — A transaction is signed by it

The `Signer`, which is authorized to spend your tokens and the Account which holds your tokens **are bonded together on Ethereum.** That means that if you lose your signer, you lose your access to your account (which has the funds).

Now, what if the signer was designed as separated from the Account? Enter the second option: `Contract Accounts`.


### Contract Account
A `Contract Account` is a smart contract separated from the `Signer`(the authorizer). It can have its logic for signing and recovery. That means that if you lose access to your `Signer`, it doesn’t necessarily mean that you lose access to your account. Again, this is where the name Account Abstraction comes in. The Account is abstracted away from the signer.

Having a contract account comes with many benefits, and the most important is that it can contain some logic that recovers your funds. One type of logic pioneered by Argent is **Social Recovery**.&#x20;

**Social recovery** is a way to assign guardians to your account in case something happens and you want to recover it. This method takes in a huge burden of safeguarding your assets alone and can bring self-custody to the masses.&#x20;

## Candide Contracts

Candide leverages several technologies to build its contract-based wallet

### ERC-4337 - A Standard For Account Abstraction&#x20;

There have been some serious efforts throughout the years to change from `EOA` to `Contract Account` on Ethereum through Account Abstraction. It is a huge change to the Ethereum Protocol. [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) brings the benefits of Account Abstraction without Protocol Changes.

### Gnosis Safe

Candide leverages a modified Safe for its Base Wallet Contracts. This allows Candide to take advantage of the most trusted contracts for DAOs to manage digital tokens. Candide will use Gnosis Safe modular design to ship its core features, including Account Recovery, and future ones like time-locks and withdraw limits.
