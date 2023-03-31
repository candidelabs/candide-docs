# Security

Information about CANDIDE's security processes, current configuration and disclosures.

Note that CANDIDE is currently deployed only on testnet and is gearing up to deploy to optimism mainnet.  

:::warning Warning
CANDIDE Wallet is in alpha release and may experience technical issues or introduce breaking changes from time to time. By using CANDIDE wallet, you accept the following:

- I understand that CANDIDE may introduce changes that make my existing account unsafe/unusable and force me to create/migrate to new ones

- I understand that CANDIDE may experience technical issues and my transactions may fail for various reasons.
:::

## Vulnerability disclosure process

CANDIDE is committed to working with researchers who submit security vulnerability notifications to us, to resolve those issues on an appropriate timeline, and to perform a coordinated release, giving credit to the reporter if they would so like.
For all security-related issues, CANDIDE has the following main points of contact:

| Contact                | Email                             | Download Public key          |
| ---------------------- | --------------------------------- | -------------------------    |
| andrew                 | andrew.wahid1 at gmail.com        |                              | 
| marc                   | sed at protonmail.com             |[PGP](./marc-publickey.asc)   |
| sherif                 | sherif.ahmed990 at gmail.com      |[PGP](./sherif-publickey.asc) |

Include all contacts in your communication, PGP encrypted to all parties.

You can also reach out informally over discord to ping us without mentioning any details. We will share an encrypted method for chat communication

## Contracts

- The core contracts of CANDIDE are based on Safe's. `CandideWallet.sol` implements the necessary functions to interact with the ERC-4337 `EntryPoint`: the setup, the validation of `UserOperations` and the execution of transactions from the `EntryPoint`.

   - [CandideWallet.sol](https://github.com/candidelabs/CandideWalletContracts/blob/main/contracts/candideWallet/CandideWallet.sol)
 
- Safe contracts are user-upgradable. Once user deploys their contract account, they remain their only owner and can accept or deny any upgrades. CANDIDE uses Safe v.1.4.0.

   - CANDIDE v.0.1 uses the unreleased [Safe v.1.4.0](https://github.com/safe-global/safe-contracts)

- ERC-4337 Entrypoint contracts:
   - [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337)

- The Account Recovery Module
   - [SocialRecoveryModule.Sol](https://github.com/candidelabs/CandideWalletContracts/blob/main/contracts/modules/social_recovery/SocialRecoveryModule.sol)


## Security assumption

### Bundler

CANDIDE wallet is currently running a private bundler. This is akin to a private relayer that all smart contract wallets today run to forward users' transactions to the Mempool.

The censorship resistance version of the relayer is an ERC-4337 Bundler (either block builders, or users that can send transactions to block builders through a bundle marketplace) that runs in a p2p network. Once the p2p network implementation is ready and enough Bundlers participate in the network, CANDIDE will deprecate its private relayer to avoid its trust assumptions.

### CANDIDE mobile app

The mobile app is developed as open-source software for both the Android Google Play store and IOS App store. The artifacts are pinned and hashed to mitigate from supply chain attacks.


- **Android** 

   - The android APK bundle can be built directly through the open-source code published on Github. Users can build from the source code and upload the bundle directly to their Android phones.

   - The singing key for Android Developer Account is air-gapped. It is used verify that the developer of the account is indeed the one uploading the build.

   - Verifying the build for android builds can be accomplished through [Reproducible Builds](https://reproducible-builds.org/). This is a work in progress

- **IOS** 
   - Due to the nature of the Apple ecosystem, users wishing to build from source code must create paid developer accounts with apple to upload the app to their developer account to be used in their iPhones
   
   - The signing certificate can only be stored on Apple's cloud infrastructure

**Play & App Store**

- **Play & App Store** - CANDIDE wallet mobile app published in Google Play and Apple's App store requires trust in its developers. The Google & Apple developer account is currently maintained by `CANDIDE Core Contributors`.

- **Mobile App Updates** At any time, Google or Apple may decide to ban CANDIDE Core Contributors from publishing updates to the mobile app. The risk leaves users with an unmaintained mobile app (the latest version they downloaded). This is a centralization risk for all mobile apps published to google and apple app stores. CANDIDE remains committed to building censorship-resistant interfaces and will publish in the future a web/desktop app to interact with its contract.