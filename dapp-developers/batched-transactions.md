---
description: >-
  Batched transactions allows you to to perform multiple transactions in one
  single on-chain transaction.
---

# Batched transactions

You can send an array of transactions and they will all get processed in 1 single transaction. Candide batched transactions are also atomic; meaning that all transactions in the batch must succeed, otherwise if any of the batched transactions fails then they are all cancelled. \
\
[EIP-5792](https://github.com/ethereum/EIPs/pull/5792/files) allows us to standarise JSON-RPC methods for dapps to communicate bundle calls to wallet using:

&#x20;`wallet_sendFunctionCallBundle`,`wallet_getBundleStatus`&#x20;

## Using EthersJS Library

### Send Transaction Batch

Example of how to send a transaction batch (2 ETH transfers) using ethersJS and walletconnect

```javascript
import { ethers } from "ethers";
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

// connect with walletconnect
async function getWeb3Modal() {
  const web3Modal = new Web3Modal({
    network: 'goerli',
    cacheProvider: false,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        },
      },
    },
  });
  return web3Modal;
}
const web3Modal = await getWeb3Modal();
const connection = await web3Modal.connect();

// set the provider
const provider = new ethers.providers.Web3Provider(connection);

// get the signer
const signer = provider.getSigner();

// define your transaction
const txs = [
  {
    "chainId": 5,
    "from": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    "calls": [
      {
        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        "value": "10000000000000000",
        "data": "0x",
        "gas": "0x76c0",
      },
      {
        "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        "value": "10000000000000000",
        "data": "0x",
        "gas": "0x76c0",
      }
    ]
  }
]
```

### Get Transaction Status

```javascript
const { transactionHash } = await signer.send("wallet_sendFunctionCallBundle", txs);

// get the status of the bundle call 
const status = await signer.send("wallet_getBundleStatus", [transactionHash]);

// example of status reponse
/* 
{
  "calls": [
    {
      "status": "CONFIRMED",
      "receipt": {
        "logs": [
          {
            "address": "0xa922b54716264130634d6ff183747a8ead91a40b",
            "topics": [
              "0x5a2a90727cc9d000dd060b1132a5c977c9702bb3a52afe360c9c22f0e9451a68"
            ],
            "data": "0xabcd"
          }
        ],
        "success": true,
        "blockHash": "0xf19bbafd9fd0124ec110b848e8de4ab4f62bf60c189524e54213285e7f540d4a",
        "blockNumber": "0xabcd",
        "blockTimestamp": "0xabcdef",
        "gasUsed": "0xdef",
        "transactionHash": "0x9b7bb827c2e5e3c1a0a44dc53e573aa0b3af3bd1f9f5ed03071b100bb039eaff"
      }
    },
    {
      "status": "PENDING"
    }
  ]
}
*/
```

