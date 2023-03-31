---
title: Install
description: Instructions for running Voltaire ERC-4337 Python Bundler
---

# Install

This guide is intended for developers wishing to spin a local instance of Voltaire ERC-4337 Python bundler for handling User Operations. Voltaire is open source and can be found on [github.com/candidelabs/voltaire](https://github.com/candidelabs/voltaire)

:::tip
Looking for a quick bundler instance? Run your own with a single command with **docker** instructions.

Run from the source if you are interested in developing and contributing to the project. 
:::

## Docker

The quickest way to get started is to use the docker image. Simply install [docker](https://docs.docker.com/engine/install) and run the following command to start a geth node and deploy the EntryPoint contract

```bash
docker run --rm -ti sherifahmed990/voltaire-bundler:latest --entrypoint $ENTRYPOINT --bundler_secret $BUNDLER_SECRET --rpc_url $RPC_URL --geth_url $GETH_URL --chain_id $CHAIN_ID --verbose
```

    
| Variable       |Comment                                     |
| ---------------| -------------------------------------------|
| $ENTRYPOINT    | Address of the [EntryPoint](../security/deployment/0-testnet.md) contract
| $BUNDLER_SECRET| Private key of the bundler. Use any EOA's private key and make sure it's funded with some ETH                 
| $RPC_URL       | URL of the rpc endpoint you will be hosting. Use `0.0.0.0` as default
| $GETH_URL      | URL to an ethereum node. Use the URL of your own instance if you are running a full node locally, or a link to a full node endpoint from an RPC provider like Infura
| $CHAIN_ID  | Chain ID of the network the bundler will operate in

This command will pull the latest docker image and will then start the bundler to listen for UserOperations. Once running, you can then send User Operation to the following if you used the default $RPC_URL: `0.0.0.0:3000/rpc`

## Ubuntu
Running from the source requires `Python3.11` or above well as some tools to compile its dependencies. On Ubuntu, the `python3.11-dev` & `libpython3.11-dev` package contains everything we need

```
apt-get install python3.11-dev
```

```
apt-get install libpython3.11-dev
```

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

### Start geth and deploy the EntryPoint
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

### Run the bundler in a new terminal
```
poetry run python3 main.py --entrypoint $ENTRYPOINT --bundler_secret $BUNDLER_SECRET --chain_id $CHAIN_ID --verbos
```

#### Test the bundler by cloning `eth-infinitism/bundler-spec-tests`

Follow the instruction in <a href='https://github.com/eth-infinitism/bundler-spec-tests'>eth-infinitism/bundler-spec-tests</a> to install dependencies and run the test
