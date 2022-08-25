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

### MAIN FEATURES

#### **fetching user notifications**
```typescript
const notifications = await EpnsAPI.user.getFeeds({
  user: '0xabc123', // user address
  chainId: 1 // ETH network chain ID
});
```

#### **fetching user spam notifications**
```typescript
const spams = await EpnsAPI.user.getFeeds({
  user: '0xabc123', // user address,
  spam: true,
  chainId: 1 // ETH network chain ID
});
```

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| user*    | string  | -       | user account address                       |
| page     | number  | 1       | page index of the results                  |
| limit    | number  | 10      | number of items in 1 page                  |
| spam     | boolean  | false   | if "true" it will fetch spam feeds         |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]|
| raw      | boolean  | false      | if "true" the method will return unformatted raw API response|
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |

#### **fetching user subscriptions**
```typescript
const subscriptions = await EpnsAPI.user.getSubscriptions({
  user: '0xpyz987', // user address
  chainId: 1 // ETH network chain ID
});
```

where `subscriptions` is a list of channels `[{ channel: '0xaddress', ... }]` subscribed by the user.

*Note: We can find out if a user is subscribed to a channel by checking if the channel address is present in the subscriptions list*

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| user*    | string  | -       | user address                       |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42 etc]|
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |


#### **fetching channel details**
```typescript
const subscribers = await EpnsAPI.channels.getChannel({
  channel: '0xpyz987', // channel address
  chainId: 1 // ETH network chain ID
});
```

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| channel*    | string  | -       | channel address                       |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]|
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |


#### **searching for channel(s)**
```typescript
const subscribers = await EpnsAPI.channels.search({
  query: 'epns', // a search query
  chainId: 1, // ETH network chain ID
  page: 1, // page index
  limit: 20 // no of items per page
});
```

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| query*    | string  | -       | search query                              |
| page     | number  | 1       | page index of the results                  |
| limit    | number  | 10      | number of items in 1 page                  |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |


#### **opt in to a channel**
```typescript
await EpnsAPI.channels.subscribe({
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
| channelAlias | string | - |  alias for the original channel address, REQUIRED ONLY if on non ETH network      |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| verifyingContractAddress      | string | - | EPNS communicator contract address|
| onSuccess      | function | -   | on success callback |
| onError      | function | -   | on error callback |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |


If you are getting the `channelData` from [getChannel](#fetching-channel-details) then you can get the alias address as follows -
```typescript
channelAlias = channelData['alias_address']
```

#### **opt out to a channel**
```typescript
await EpnsAPI.channels.unsubscribe({
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
| channelAlias | string | - |  alias for the original channel address, REQUIRED ONLY if on non ETH network      |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| verifyingContractAddress      | string | - | EPNS communicator contract address|
| onSuccess      | function | -   | on success callback |
| onError      | function | -   | on error callback |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |

If you are getting the `channelData` from [getChannel](#fetching-channel-details) then you can get the alias address as follows -
```typescript
channelAlias = channelData['alias_address']
```


<sup>*</sup>EPNS communicator contract address
```
ETH Mainnet - 0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa
ETH Kovan - 0x87da9Af1899ad477C67FeA31ce89c1d2435c77DC
```


### UTILS
#### **parsing notifications**
Utils method to parse raw EPNS Feeds API response into a pre-defined shape as below.
```typescript
// fetch some raw feeds data
const apiResponse = await EpnsAPI.user.getFeeds({
  user: '0xabc123', // user address
  chainId: 1, // ETH network chain ID
  raw: true
});
// parse it to get a specific shape of object.
const parsedResults = EpnsAPI.utils.parseApiResponse(apiResponse);

const [oneNotification] = parsedResults;

// Now this object can be directly used by for e.g. "@epnsproject/sdk-uiweb"  NotificationItem component as props.

const {
  cta,
  title,
  message,
  app,
  icon,
  image,
  url,
  blockchain,
  secret,
  notification
} = oneNotification;

```
*We get the above `keys` after the parsing of the API repsonse.*

<br />


### ADVANCED (WIP)


### DEPRECATED

#### **get a channel's subscriber list of addresses**
```typescript
const subscribers = await EpnsAPI.channels._getSubscribers({
  channel: '0xpyz987', // channel address
  chainId: 1 // ETH network chain ID
});
```

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| channel*    | string  | -       | channel address                       |
| channelAlias | string | - |  alias for the original channel address, REQUIRED ONLY if on non ETH network      |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |


If you are getting the `channelData` from [getChannel](#fetching-channel-details) then you can get the alias address as follows
```typescript
channelAlias = channelData['alias_address']
```

