---
description: Social Recovery Through Guardians
cover: ../.gitbook/assets/guardians_of_the_galaxy_by_meomoc-d7ucvts-2165270492.jpeg
coverY: 0
---

# ◀ Account Recovery

Candide integrates Gnosis Safe **Recovery Module** as its logic to recover a wallet in the case of a user losses their mobile phone.

This modules allows to replace an owner without the Owner's confirmations if Guardians approve the replacement

* The system is made of Guardians, that only have access to recover the funds.&#x20;
* During daily operations, a user can spend and sign transactions as they want without needing for confirmation from their Guardians.&#x20;
* Only in the case that the user looses their mobile phone that they can reach out to the guardians to sign a transaction to recover their wallet.

This an an experience similar to bank accounts or any type of login. If you loose access to your account by forgetting your password, you generally call your bank or use a 2 factor auth method to verify your identity. Guardians can be extended to any type. Below are a few examples:

* :family:**Family and Friends**
* ****:bank: **Institutions:** which would require to verify your identity through email / phone / other method in order to sign the recovery transaction
* :key: A **hardware wallet** or any other wallet

### :shield: Gnosis Safe Social Recovery Module&#x20;

[Safe's Social Recovery](https://github.com/safe-global/safe-contracts/blob/v1.0.0/contracts/modules/SocialRecoveryModule.sol) mechanism is as follows:

* Guardians (called friends) need to be assigned at wallet deployment
* There must be at **least** 2 friends assigned
* A threshold is assigned for a minimum number of friends to recover the wallet

Candide's modification at the moment for the Safe Recovery Module:

* The ability to add and remove Friends after wallet deployment
* Add a read function to know the number of friends that currently guard a wallet

For maximum protection, Candide recommends that users to have:

* At minimum 3 Guardians to protect their account
* To keep guardians private. Guardians identities are only revealed when recovering a wallet. They also wouldn’t know each other if friends are afraid of a coordinated attack. &#x20;
* Preferably from different backgrounds: family, friends, and at least one institution.

### :microscope:Future Design

Candide plans to enhance its Social Recovery Design by adopting an approach where the owner of the wallet is always in full control, in case Guardians tries to be malicious. This design is inspired by Argent X Social Recovery system, but without the co-signer involvement.&#x20;

Our future design is considered as follow: &#x20;

### High Level Specification

* The signer key is stored on the user's phone
* A guardian can be any signer with public address.
* Users can assign any number of guardians, and can dictate how many guardians are needed to recover a wallet.
* guardian are privates and not known
* A signer can trigger a function to remove a guardian
* A guardian can trigger a function to recover a wallet and change the signer
* Signer can cancel escape that is triggered by a guardian
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

