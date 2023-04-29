---
title: Install
description: Instructions for running Voltaire ERC-4337 Python Bundler
---

# Install

This guide is intended for developers wishing to spin a instance of Voltaire ERC-4337 Python bundler for handling User Operations. Voltaire is open source and can be found on [github.com/candidelabs/voltaire](https://github.com/candidelabs/voltaire)

:::tip
Looking for a quick bundler instance? Use one of our [public hosted endpoint](./3-rpc-endpoints.mdx) for your developement
:::

## Docker

The quickest way to get started is to use the docker image. Simply install [docker](https://docs.docker.com/engine/install) and run the following command to start a geth node and deploy the EntryPoint contract

```bash
docker run --net=host --rm -ti sherifahmed990/voltaire-bundler:latest --entrypoint $ENTRYPOINT --bundler_secret $BUNDLER_SECRET --rpc_url $RPC_URL --rpc_port $PORT --ethereum_node_url $ETHEREUM_NODE_URL --chain_id $CHAIN_ID --verbose
```

| flags            |Comment                                     |
| -----------------| -------------------------------------------|
| `--entrypoint`   | Address of the [$ENTRYPOINT](../security/deployment/0-mainnet.md) contract address
|`--bundler_secret`| Private key of the bundler. Use any EOA's to be the `$BUNDLER_SECRET`   and make sure it's funded with some ETH                  
| `$RPC_URL`       | URL of the rpc endpoint you will be hosting. Use `0.0.0.0` as default
| `--ethereum_node_url`| Pass the `$ETHEREUM_NODE_URL` of your own instance if you are running a full node [locally](#local-full-node), or a link to a full node endpoint from an [RPC provider](#rpc-provider).
| `--chain_id`     | `$CHAIN_ID` of the network the bundler will operate in
| `--unsafe`       | In order to implement the full spec storage access rules and opcode banning, it must run against a go-ethereum node, which supports debug_traceCall with javascript "tracer" Specifically, `hardhat node` and `ganache` do NOT support this API. You can still run the bundler with such nodes, but with `--unsafe` so it would skip these security checks
| `--verbose`      | To get verbose logs (optional)
| `--rpc_port`     | `$PORT` number for the rpc (optional)

This command will pull the latest docker image and will then start the bundler to listen for UserOperations. Once running, you can then send User Operation to the following if you used the default `$RPC_URL`: `0.0.0.0:3000/rpc`

### RPC Provider
If you want to run voltaire locally and have a paid plan with an RPC provider for a full node that supports supports debug_traceCall with javascript "tracer", you can simple replace `$ETHEREUM_NODE_URL` with the link to the rpc endpoint. If it doesn't support a javascript tracer, you can run with the `--safe` flag for testing purposes. This mode is not meant to be used in production. 

### Local Full Node
If you are running your own full node, simply replace `$ETHEREUM_NODE_URL` with your own. If you want to run your own node, which comes with superpowers, follow the instruction below to run GETH [using docker](#start-geth). You can also run a different client implentation. We have tested Voltaire with [go-ethereum](https://geth.ethereum.org/).

## Ubuntu
### Install Poetry
```
curl -sSL https://install.python-poetry.org | python3 -
```
#### Install dependencies
```
poetry install
```

#### Make sure you are using the right python version

```
poetry env use python3.11
```

### Install Docker

Follow the installation guide to install [docker on ubunutu](https://docs.docker.com/engine/install/ubuntu/)

#### Post docker installation

Follow the instruction for docker's [post linux instalation](https://docs.docker.com/engine/install/linux-postinstall/)  

### Start GETH
```bash
docker run --rm -ti --name geth -p 8545:8545 ethereum/client-go:v1.10.26 \
  --miner.gaslimit 12000000 \
  --http --http.api personal,eth,net,web3,debug \
  --http.vhosts '*,localhost,host.docker.internal' --http.addr "0.0.0.0" \
  --ignore-legacy-receipts --allow-insecure-unlock --rpc.allow-unprotected-txs \
  --dev \
  --verbosity 4 \
  --nodiscover --maxpeers 0 --mine --miner.threads 1 \
  --networkid 1337
```

#### In another terminal, deploy the EntryPoint and fund the signer

```bash
geth --exec 'loadScript("test/deploy.js")' attach http://0.0.0.0:8545
```

#### Set the ENTRYPOINT environment variable

```bash
source test/init-params 
```

### Run the bundler
#### In a new terminal
```
poetry run python3 main.py --entrypoint $ENTRYPOINT --bundler_secret $BUNDLER_SECRET --chain_id $CHAIN_ID --verbos
```

#### Test the bundler by cloning `eth-infinitism/bundler-spec-tests`

Follow the instruction in <a href='https://github.com/eth-infinitism/bundler-spec-tests'>eth-infinitism/bundler-spec-tests</a> to install dependencies and run the test
