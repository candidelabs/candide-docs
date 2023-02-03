# Signature Validation


## Signing Messages

Smart Contract wallets can sign arbitrary messages similar to EOAs like MetaMask.

### TS/JS - Ethersjs Library Example 

To request a user's signature to [sign messages](https://docs.ethers.org/v5/api/signer/#Signer-signMessage)

```js
const message = 'I am the Owner of this Account';

try {
    const signature = await signer.signMessage(message);
    console.log(signature, "user signature");
} catch(e) {
  console.log(e);
}
```

To request a user's signature [typed data](https://docs.ethers.org/v5/api/signer/#Signer-signTypedData) message](https://docs.ethers.org/v5/api/signer/#Signer-signTypedData):

```js
// All properties on a domain are optional
const domain = {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
};

// The named list of all type definitions
const types = {
    Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' }
    ],
    Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' }
    ]
};

// The data to sign
const value = {
    from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
    },
    to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
    },
    contents: 'Hello, Bob!'
};
try {
  signature = await signer._signTypedData(domain, types, value);

  console.log(signature);
} catch(e) {
  console.log(e);
}
```

## Validating Messages

Contracts Wallets like CANDIDE rely on [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) standard for signature validation.

The EIP-1271 is a single function on a contract defined as:

```
function isValidSignature(
  bytes32 _hash,
  bytes memory _signature
) public view returns (bytes4 magicValue)
```
The first `_hash` argument accepts the hash of the message digest, and the second argument `_signature` is the signed payload returned by the wallet upon signing.

### TS/JS - Ethersjs Library Example
First: check if the user wallet is an EOA or a smart contract wallet:

```js
export async function isSmartContract(address: string, provider: any) {
  try {
    const code = await provider.getCode(address);
    return code !== '0x';
  } catch (error) {
    console.error(error);
    return false;
  }
}

const isSmartContractWallet = isSmartContract(walletAddress);
```

Second: if `true`, you can use the `isValidSignature` method to validate the signature

```js
const message = "I am the owner of the Account";

// user returns the message you asked them to sign previously
const signature = "0x123..."

const walletAddress = "0x456...";
const abiSmartWallet = ['function isValidSignature(bytes32 _message, bytes _signature) public view returns (bool)']

const userAccountContract = new ethers.Contract(walletAddress, abiSmartWallet, provider);
const hashMessage = ethers.utils.hashMessage(message);

try {
  const returnValue = await signer.isValidSignature(hashMessage, signature)
} catch (error) {
  // signature is not valid
}
```