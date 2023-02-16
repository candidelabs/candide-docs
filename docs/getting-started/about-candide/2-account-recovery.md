---
description: Social Recovery Through Contacts
---

# Account Recovery

## Overview

Candide offers a recovery method as its logic to recover an account in the case a user losses access to their wallet.
It is a module that  allows replacing of an owner without the Owner's confirmation if their recovery contacts approve the replacement

- The system is made of Recovery Contacts (also known as Guardians), that only have access to recover the funds.
- During daily operations, a user can spend and sign transactions as they want without needing confirmation from their Guardians.
- When a user loses access to their wallet, they can reach out to their recovery contacts to sign a transaction to recover their wallet.

This experience is similar to bank accounts or any type of login. If you lose access to your account by forgetting your password, you generally call your bank or use a 2 factor auth method to verify your identity. Guardians can be extended to any type. Below are a few examples:

* **Family and Friends**
* **Institutions**: They would require verifying your identity through email/phone/another method to sign the recovery transaction
* A **hardware wallet** or any Ethereum wallet of your choice 

:::tip Recommendation 
* Add at least 3 Guardians to protect their account
* Keep Guardians private. Use fresh addresses when adding a recovery contact
* Preferably from different backgrounds: family, friends, and one institution
:::

## CANDIDE Recovery Design

The owner of the wallet is always in full control, in case their Recovery Contacts try to be malicious.&#x20;

- A threshold is assigned for a minimum number of guardians to recover the wallet.
- An owner can add and remove Guardians after the account deployment

:::tip Majority Needed
CANDIDE wallet has a default threshold for the number of signatures required to initiate a recovery.
It's **more than 50%**. For example: if you have 4 guardians, 3 are needed to recover your account.
:::

## High-Level Specification

* The owner's key is stored on the user's phone
* A guardian can be any signer with a public address
* Users can assign any number of guardians and can dictate how many guardians are needed to recover a wallet

| Action                  | Owner  | Guardians| Comment                                                                                         |
| ----------------------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| Add Guardian            | X      |          |                                                                                                 |
| Remove Guardian         | X      |          |                                                                                                 |
| Sign Recovery           |        | X        | The number of signatures needed is the threshold added by the Owner                             |
| Execute Recovery        | X      | X        | A recovery period is started if the threshold of guardians' signatures is meant                 |
| Cancel Recovery         | X      |          | Owner can cancel a recovery in progress                                                         |
| Finilize Recovery       | X      | X        | Anyone can trigger the finilize recovery after the delay is over          m                     |
| Upgrade                 | X      |          |                                                                                                 |
