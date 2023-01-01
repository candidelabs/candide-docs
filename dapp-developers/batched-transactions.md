---
description: >-
  Batched transactions allows you to perform multiple transactions in one single
  on-chain transaction
---

# ➕ Batched transactions

You can send an array of transactions and they will all get processed in 1 single transaction. Candide batched transactions are atomic; meaning that all transactions in the batch must succeed, otherwise if any of the batched transactions fails then they are all cancelled. \
\
[EIP-5792](https://github.com/ethereum/EIPs/pull/5792/files) allows us to standarise JSON-RPC methods for dapps to communicate bundle calls to wallets using `wallet_sendFunctionCallBundle` and `wallet_getBundleStatus`

You will need to download CANDIDE wallet to test your dapp. Get access from the [#dev channel in discord](https://discord.gg/NM5HakA9nC) by pinging a core contributor.

## Web3Modal

#### Try it in this <mark style="color:blue;"></mark> [<mark style="color:blue;">sandbox</mark>](https://codesandbox.io/s/bundled-calls-web3modal-527p9h?file=/src/App.js:1767-1816)<mark style="color:blue;"></mark>

### Send Bundle Calls

Example of how to send a transaction batch (2 ETH transfers) using Web3Modal

<pre class="language-jsx"><code class="lang-jsx">import Web3Modal from "web3modal";
import WalletConnect from "@walletconnect/web3-provider";

// define walletconnet provider
export const providerOptions = {
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "API_KEY" // required
    }
  }
};

//define web3Modal
<strong>const web3Modal = new Web3Modal({
</strong>  cacheProvider: true, // optional
  providerOptions // required
});

// get provider
const provider = await web3Modal.connect();
const library = new ethers.providers.Web3Provider(provider);


// define txs: send 0.001 ETH to two different addresses
const calls = [
  {
    chainId: 5,
    from: account,
    calls: [
      {
        to: "0xED0704E34278560a220A1EDFd9A2972b181081Fc",
        value: "0x5AF3107A4000",
        data: "0x",
        gas: "0x76c0"
      },
      {
        to: "0xf758D47a96685C1bb77223767F17D15497E610f3",
        value: "0x5AF3107A4000",
        data: "0x",
        gas: "0x76c0"
      }
    ]
  }
];

const txHash = await library.provider.request({
  method: "wallet_sendFunctionCallBundle",
  params: calls
});

console.log(txHash);
</code></pre>

### Get Bundle Status

```javascript
const status = await library.provider.request({
  method: "wallet_getBundleStatus",
  params: [txHash]
});

if (status) {
  const response = JSON.parse(status).calls[0];
  console.log(response);
  
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
}
```

## WalletConnect Standalone

### Send Bundle Calls

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

// send 0.001 ETH to two different addresses
const calls = [
  {
    chainId: 5,
    from: account,
    calls: [
      {
        to: "0xED0704E34278560a220A1EDFd9A2972b181081Fc",
        value: "0x5AF3107A4000",
        data: "0x",
        gas: "0x76c0"
      },
      {
        to: "0xf758D47a96685C1bb77223767F17D15497E610f3",
        value: "0x5AF3107A4000",
        data: "0x",
        gas: "0x76c0"
      }
    ]
  }
];

// send transaction
const transactionHash = await connector.sendCustomRequest({
  id: 1671118055013479,
  jsonrpc: "2.0",
  method: "wallet_sendFunctionCallBundle",
  params: calls,
});
```

### Get Bundle Status

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

