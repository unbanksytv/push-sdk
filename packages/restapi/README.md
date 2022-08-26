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

#### **sending notification**
*special note on generating the "signer" object for different platforms:*<sup>*</sup>

- When using in Server side code: 
```typescript
const ethers = require('ethers');
const PK = 'your_channel_address_secret_key';
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);
```
- When using in Frontend code: 
```typescript
// any other web3 ui lib is also acceptable
import { useWeb3React } from "@web3-react/core";
.
.
.
const { account, library, chainId } = useWeb3React();
const signer = library.getSigner(account);
```

DIFFERENT USE CASES FOR `sendNotification()`

##### **direct payload for single recipient(target)**
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 3, // target
  identityType: 2, // direct payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  recipients: '0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1', // recipient address
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **direct payload for group of recipients(subset)**
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 4, // subset
  identityType: 2, // direct payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  recipients: ['0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1', '0x52f856A160733A860ae7DC98DC71061bE33A28b3'], // recipients addresses
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **direct payload for all recipients(broadcast)**
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 1, // broadcast
  identityType: 2, // direct payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **IPFS payload for single recipient(target)**
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 3, // target
  identityType: 1, // ipfs payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  ipfsHash: 'bafkreicuttr5gpbyzyn6cyapxctlr7dk2g6fnydqxy6lps424mcjcn73we', // IPFS hash of the payload
  recipients: '0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1', // recipient address
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **IPFS payload for group of recipients(subset)**
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 4, // subset
  identityType: 1, // ipfs payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  ipfsHash: 'bafkreicuttr5gpbyzyn6cyapxctlr7dk2g6fnydqxy6lps424mcjcn73we', // IPFS hash of the payload
  recipients: ['0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1', '0x52f856A160733A860ae7DC98DC71061bE33A28b3'], // recipients addresses
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **IPFS payload for all recipients(broadcast)**
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 1, // broadcast
  identityType: 1, // direct payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  ipfsHash: 'bafkreicuttr5gpbyzyn6cyapxctlr7dk2g6fnydqxy6lps424mcjcn73we', // IPFS hash of the payload
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **minimal payload for single recipient(target)**
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 3, // target
  identityType: 0, // Minimal payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  recipients: '0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1', // recipient address
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **minimal payload for a group of recipient(subset)**
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 4, // subset
  identityType: 0, // Minimal payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  recipients: ['0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1', '0x52f856A160733A860ae7DC98DC71061bE33A28b3'], // recipients address
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **minimal payload for all recipients(broadcast)**
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 1, // broadcast
  identityType: 0, // Minimal payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **graph payload for single recipient(target)**
***Make sure the channel has the graph id you are providing!!***
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 3, // target
  identityType: 3, // Subgraph payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  graph: {
    id: '_your_graph_id',
    counter: 3
  },
  recipients: '0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1', // recipient address
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **graph payload for group of recipients(subset)**
***Make sure the channel has the graph id you are providing!!***
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 4, // subset
  identityType: 3, // graph payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  graph: {
    id: '_your_graph_id',
    counter: 3
  },
  recipients: ['0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1', '0x52f856A160733A860ae7DC98DC71061bE33A28b3'], // recipients addresses
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

##### **graph payload for all recipients(broadcast)**
***Make sure the channel has the graph id you are providing!!***
```typescript
// apiResponse?.status === 204, if sent successfully!
const apiResponse = await EpnsAPI.payloads.sendNotification({
  signer,
  chainId: chainId,
  type: 1, // broadcast
  identityType: 3, // graph payload
  notification: {
    title: `[SDK-TEST] notification TITLE:`,
    body: `[sdk-test] notification BODY`
  },
  payload: {
    title: `[sdk-test] payload title`,
    body: `sample msg body`,
    cta: '',
    img: ''
  },
  graph: {
    id: '_your_graph_id',
    counter: 3
  },
  channel: '0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
});
```

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| signer*    | -  | -       | Signer object                       |
| channel*    | string  | -       | channel address                       |
| type*    | number  | -       | Notification Type <br/>Target = 3 (send to 1 address), <br/>Subset = 4 (send to 1 or more addresses),<br/> Broadcast = 1 (send to all addresses)                     |
| identityType*    | number  | -       | Identity Type <br/> Minimal = 0, <br/>IPFS = 1, <br/>Direct Payload = 2, <br/>Subgraph = 3 }                      |
| recipients*    | string or string[]  | -       | for Notification Type = Target it is 1 address, <br /> for Notification Type = Subset, Broadcast it is an array of addresses  |
| chainId  | number  | 42      | ETH network chainId [Mainnet - 1, Kovan - 42, etc]                       |
| notification.title*      | string | - | Push Notification Title |
| notification.body*      | string | - | Push Notification Body |
| payload.title      | string | - | Notification Title |
| payload.body      | string | - | Notification Body |
| payload.cta      | string | - | Notification Call To Action url |
| payload.img      | string | - | Notification Media url |
| payload.sectype      | string | - | If Secret Notification then pass|
| graph.id      | string | - | graph id, required only if the identityType is 3 |
| graph.counter      | string | - | graph counter, required only if the identityType is 3 |
| ipfsHash      | string | - | ipfsHash, required only if the identityType is 1 |
| expiry      | number | - | (optional) epoch value if the notification has an expiry |
| hidden      | boolean | false | (optional) true if we want to hide the notification |
| dev      | boolean | false   | Pass this if you need to use EPNS dev APIs |



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

