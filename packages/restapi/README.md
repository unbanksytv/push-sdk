# restapi
This package gives access to EPNS backend APIs

## How to use in your app?

### Installation
```
  yarn add @epnsproject/sdk-restapi
```
  or
```
  npm install @epnsproject/sdk-restapi  
```
Import in your file
```typescript
import * as EpnsAPI from "@epnsproject/sdk-restapi";
```

### Features

#### **fetching notifications**
```typescript
const notifications = await EpnsAPI.fetchNotifications({
  user: '0xabc123', // user address
  chainId: 1 // ETH network chain ID
});
```
Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| user*    | string  | -       | user account address                       |
| page     | number  | 1       | page index of the results                  |
| pageSize | number  | 10      | number of items in 1 page                  |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |

#### **fetching spam notifications**
```typescript
const spams = await EpnsAPI.fetchSpamNotifications({
  user: '0xabc123', // user address,
  chainId: 1 // ETH network chain ID
});
```

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| user*    | string  | -       | user account address                       |
| page     | number  | 1       | page index of the results                  |
| pageSize | number  | 10      | number of items in 1 page                  |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |


#### **fetching channel details**
```typescript
const channelData = await EpnsAPI.getChannelByAddress({
  channel: '0xpyz987', // channel address
  chainId: 1 // ETH network chain ID
});
```

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| channel*    | string  | -       | channel address                       |
| page     | number  | 1       | page index of the results                  |
| pageSize | number  | 10      | number of items in 1 page                  |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |


#### **fetching channel's subscribers details**
```typescript
const subscribers = await EpnsAPI.getSubscribers({
  channel: '0xpyz987', // channel address
  chainId: 1 // ETH network chain ID
});
```

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| channel*    | string  | -       | channel address                       |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |


#### **check if user is subscribed to a channel**
```typescript
const subscriberStatus = await EpnsAPI.isUserSubscribed({
  channel: '0xpyz987', // channel address
  user: '0xabc123', // user address,
  chainId: 1 // ETH network chain ID
});
```

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| channel*    | string  | -       | channel address                       |
| user*    | string  | -       | user address                       |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |


#### **opt in to a channel**
```typescript
await EpnsAPI.optIn({
  signer: _signer,
  channelAddress: '0xpyz987', // channel address
  userAddress: '0xabc123', // user address
  chainId: 1, // ETH network chain ID
  onSuccess: () => {
   console.log('opt in success');
  },
  onError: () => {
    console.error('opt in error');
  },
})
```

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| signer*    | -  | -       | Signer object                       |
| channelAddress*    | string  | -       | channel address                       |
| userAddress*    | string  | -       | user address                       |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| verifyingContractAddress      | string | - | EPNS communicator contract address|
| onSuccess      | function | -   | on success callback |
| onError      | function | -   | on error callback |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |


#### **opt out to a channel**
```typescript
await EpnsAPI.optOut({
  signer: _signer,
  channelAddress: '0xpyz987', // channel address
  userAddress: '0xabc123', // user address
  chainId: 1, // ETH network chain ID
  onSuccess: () => {
   console.log('opt out success');
  },
  onError: () => {
    console.error('opt out error');
  },
})
```
Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| signer*    | -  | -       | Signer object                       |
| channelAddress*    | string  | -       | channel address                       |
| userAddress*    | string  | -       | user address                       |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| verifyingContractAddress      | string | - | EPNS communicator contract address|
| onSuccess      | function | -   | on success callback |
| onError      | function | -   | on error callback |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |

**<sup>*</sup>EPNS communicator contract address**
```
Mainnet - 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa
Kovan - 0x87da9Af1899ad477C67FeA31ce89c1d2435c77DC
```

## Development

### Building

Run `nx build restapi` to build the library.

### Running unit tests

Run `nx test restapi` to execute the unit tests via [Jest](https://jestjs.io).
