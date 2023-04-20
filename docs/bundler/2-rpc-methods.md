---
title: RPC methods
description: A reference to the supported RPC methods by Voltiare ERC-4337 Bundler.
---

Voltaire Bundler exposes standard JSON-RPC API

## eth_ namespace

### Send User Operation

`eth_sendUserOperation` asks the bundler to sign and submit a User Operation

#### Request
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "eth_sendUserOperation",
  "params": [
    {
      sender,
      nonce,
      initCode,
      callData,
      callGasLimit,
      verificationGasLimit,
      preVerificationGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      paymasterAndData,
      signature,
    },
    entrypointAddress,
  ]
}
```
#### Response
It returns the hash of the User Operation. In case of an error, it returns the error message.
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0x..." // UserOpHash
}
```

### Estimate User Operation Gas
`eth_estimateUserOperationGas` generates and returns an estimate of how much gas is necessary to allow the transaction to complete, given a `UserOperation`.

#### Request
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "eth_estimateUserOperationGas",
  "params": [
    {
      sender,
      nonce,
      initCode,
      callData,
      callGasLimit,
      verificationGasLimit,
      preVerificationGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      paymasterAndData,
      signature,
    },
    entrypointAddress,
  ]
}
```

#### Response
It returns estimates for a UserOperation Gas parameters for `preVerificationGas`, `verificationGas`, and `callGasLimit`
```json
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": {
        callGasLimit
        preVerificationGas,
        verificationGas,
    },
}
```

### Get User Operation by hash

`eth_getUserOperationByHash` returns a UserOperation by its hash returned from `eth_sendUserOperation`

#### Request
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "eth_getUserOperationByHash",
  "params": [userOpHash, entrypointAddress]
}
```

#### Response
The method returns the full UserOperation object as well as the entrypoint address, the block number, the block hash, and transaction Hash.

### Get User Operation Receipt

`eth_getUserOperationReceipt` returns the receipt of a UserOperation by its hash returned from `eth_sendUserOperation`

#### Request
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "eth_getUserOperationReceipt",
  "params": [userOpHash, entrypointAddress]
}
```

#### Response
```json
{
    "jsonrpc": "2.0",
    "id": 0,
    "result": {
        userOpHash,
        sender,
        nonce,
        paymaster,
        actualGasCost, // actual (gas price * gas used) of the user operation
        actualGasUsed, // actual gas used of the user operation
        success, // user operation revert status
        reason, // If reverted, user operation revert reason
        logs,
        receipt, // The TransactionReceipt object. Note that the returned TransactionReceipt is for the entire bundle, not only for this UserOperation
    }
}
```

### Get Chain ID

`eth_chainId` returns the chain ID of the current network

#### Request
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "eth_chainId",
  "params": []
}
```

#### Response
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0x1", // Chain ID
}
```

### Get Supported EntryPoints

`eth_supportedEntryPoints` returns an array of the entryPoint addresses supported by the bundler

#### Request
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "eth_supportedEntryPoints",
  "params": []
}
```

#### Response
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": ["0x00...", "0x01..."],
}
```


## debug namespace

:::info
Debug namespaces are for developement purposes. The bundler exposes a set of debug methods. These methods are not meant to be used by client applications.
:::

### Send Bundle Now
`debug_bundler_sendBundleNow` forces the bundler to execute the entire current mempool. Returns the transaction hash of the bundle submission.

#### Request
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "debug_bundler_sendBundleNow",
  "params": []
}
```

#### Response
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": "0x...", // Transaction Hash 
}
```

### Clear State

`debug_bundler_clearState` clears the the bundler mempool and reputation data of paymasters/accounts/factories/aggregators.

#### Request
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "debug_bundler_clearState",
  "params": []
}
```

#### Response
Returns `true` if successful
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": true,
}
```

### Get Mempool
`debug_bundler_dumpMempool` returns the current mempool of the bundler, given the entrypoint address

#### Request
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "debug_bundler_dumpMempool",
  "params": [entryPointAddress]
}
```
#### Response

```json
{
  "jsonrpc": "2.0",
    "id": 0,
    "result": ... // Mempool
},
```













