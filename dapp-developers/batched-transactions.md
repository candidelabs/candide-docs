---
description: >-
  Batched transactions allows you to perform multiple transactions in one single
  on-chain transaction
---

# Batched transactions

You can send an array of transactions and they will all get processed in 1 single transaction. Candide batched transactions are atomic; meaning that all transactions in the batch must succeed, otherwise if any of the batched transactions fails then they are all cancelled. \
\
[EIP-5792](https://github.com/ethereum/EIPs/pull/5792/files) allows us to standarise JSON-RPC methods for dapps to communicate bundle calls between wallets using `wallet_sendFunctionCallBundle` and `wallet_getBundleStatus`

## WalletConnect Standalone

### Send Transaction Batch

Example of how to send a transaction batch (2 ETH transfers) using walletconnect standalone client

```javascript
import { ethers } from "ethers";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// set provider
const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/$API_KEY");

// connect with walletconnect

// define connector, create a new session and connect to the right chain ID
const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
//.. 

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

// send transaction
const transactionHash = await connector.sendCustomRequest({
  id: 1671118055013479,
  jsonrpc: "2.0",
  method: "wallet_sendFunctionCallBundle",
  params: txs,
});
```

### Get Transaction Status

```javascript
// get the status of the bundle call 
const status = await connector.sendCustomRequest({
  id: 1671118055013479,
  jsonrpc: "2.0",
  method: "wallet_getBundleStatus",
  params: [transactionHash]
});

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

