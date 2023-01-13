---
description: Social Recovery Through Contacts
---

# Account Recovery

## Overview

Candide offers a **Recovery Module** as its logic to recover an account in the case of a user losses access to their wallet.
This module allows replacing of an owner without the Owner's confirmation if their recovery contacts approve the replacement

- The system is made of Recovery Contacts (also known as Guardians), that only have access to recover the funds.
- During daily operations, a user can spend and sign transactions as they want without needing for confirmation from their Guardians.
- When a user loses access to their wallet, they can reach out to their recovery contacts to sign a transaction to recover their wallet.

This experience is similar to bank accounts or any type of login. If you lose access to your account by forgetting your password, you generally call your bank or use a 2 factor auth method to verify your identity. Guardians can be extended to any type. Below are a few examples:

* **Family and Friends**
* **Institutions:**
  * it would require verifying your identity through email/phone/another method to sign the recovery transaction
* A **hardware wallet** or any Ethereum wallet

## CANDIDE Recovery Design

The owner of the wallet is always in full control, in case their Recovery Contacts try to be malicious.&#x20;

- A threshold is assigned for a minimum number of guardians to recover the wallet
- An owner can add and remove Guardians after the account deployment

## High-Level Specification

* The signer key is stored on the user's phone
* A guardian can be any signer with a public address
* Users can assign any number of guardians and can dictate how many guardians are needed to recover a wallet.
* Guardians are private and not known
* A signer can trigger a function to remove a guardian
* A guardian can trigger a function to recover a wallet and change the signer
* The signer can cancel escape that is triggered by a guardian
* Escaping takes X days before being active

| Action                  | Signer | Guardian | Comment                                   |
| ----------------------- | ------ | -------- | ----------------------------------------- |
| Execute                 | X      |          |                                           |
| Change Signer           | X      | X        |                                           |
| Change Guardian         | X      | X        |                                           |
| Trigger Escape Guardian | X      |          | Can override an escape signer in progress |
| Trigger Escape Signer   |        | X        | Fail if escape guardian in progress       |
| Escape Guardian         | X      |          | After security period                     |
| Escape Signer           |        | X        | After security period                     |
| Cancel Escape           | X      |          |                                           |
| Upgrade                 | X      |          |                                           |



For maximum protection, Candide recommends that users have:

* At minimum 3 Guardians to protect their account
* To keep guardians private. Guardians' identities are only revealed when recovering a wallet. They also wouldn’t know each other if friends are afraid of a coordinated attack.
* Preferably from different backgrounds: family, friends, and at least one institution.
