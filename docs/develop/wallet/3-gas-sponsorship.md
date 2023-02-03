# Gas Sponsorship

## Paymasters Sponsorship Options

- **Gasless**: Pay gas fees on behalf of your users, essentially making transactions Gassless
- **Subsidized**: Pay partial gas fees for your users, letting them pay only a discounted gas price
- **Paid with ERC-20** Allows your users to pay gas with your native ERC-20 token

Sponsorship can be customized to allow for only certain methods, minimum deposits or certain lock durations. In addition, users don't have to worry about gas limits or gas prices since the Paymaster automatically reprices transactions to ensure prompt execution.

Currently, the Paymaster feature is by permission only. The CANDIDE team reviews the Protocol's contracts and model to come up with a Sybil-resistant mechanism. The mechanism is shared with the protocol and is made public. In the future, it will be possible for Dapp developers to sponsor the transaction fees of their users in a non-custodial way. You can contact us on discord if you would like to partner with us and use this feature.

## Currently Supported
Users can pay their gas fees with the following currencies:
- ETH
- USDC

Users are shown a fixed fee at the time of transaction confirmation, which is used to reimburse the paymaster that will execute the transaction. This fee will not increase even if the transaction is repriced by the paymaster. This is a cost the relayers will bear and hence will optimize for.

<img
  src={require('../../../static/img/network-fees-sponsorship.png').default}
  alt="Example banner"
  width="29%"
/>
