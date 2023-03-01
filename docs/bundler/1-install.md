# Install

This guide is intended for developers wishing to spin a local instance of Voltaire ERC-4337 Python bundler for handling UserOperations. 

Voltaire is open source and can be found on [https://github.com/candidelabs/voltaire](https://github.com/candidelabs/voltaire)

## Ubuntu 

Voltaire requires `Python3.11` or above well as some tools to compile its dependencies. On Ubuntu, the `python3.11-dev` & `libpython3.11-dev` package contains everything we need

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
### Install dependencies
```
poetry install
```

### Make sure you are using the right python version

```
poetry env use python3.11
```

### Install Docker

Follow the installation guide to install [docker on ubunutu](https://docs.docker.com/engine/install/ubuntu/)

### Post docker installation

Follow the instruction for docker's [post linux instalation](https://docs.docker.com/engine/install/linux-postinstall/)  

### Start geth and deploy the EntryPoint
```
source scripts/run-geth.sh
```

### Run the bundler in a new terminal
```
poetry run python3 main.py `cat entrypoints` --verbose
```

### Test the bundler by cloning `eth-infinitism/bundler-spec-tests`

Follow the instruction in <a href='https://github.com/eth-infinitism/bundler-spec-tests'>eth-infinitism/bundler-spec-tests</a> to install dependencies and run the test
