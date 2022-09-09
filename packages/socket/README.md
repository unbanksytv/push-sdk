# socket

This package helps to connect to EPNS backend using websockets built on top of [Socket.IO](https://socket.io/docs/v4/client-api/)

## How to use in your app?


### Installation
```
  yarn add @epnsproject/sdk-socket ethers
```
  or
```
  npm install @epnsproject/sdk-socket ethers 
```
Import in your file
```typescript
import {
  createSocketConnection,
  EVENTS
} from '@epnsproject/sdk-socket';
```

#### **first create a socket connection object**
```typescript
const epnsSDKSocket = createSocketConnection({
  user: 'eip155:42:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb', // CAIP, see below
  env: 'staging',
  socketOptions: { autoConnect: false }
});
```
IMPORTANT: create the connection object in your app only when you have the `user` address available since its mandatory.

**`autoConnect`**: Generally if we don't pass `autoConnect: false` then the socket connection is automatic once the object is created. Now since we may or may not have the account address handy and wish to start the connection during instantiation so this option makes it easier for us to choose when we want to `connect` or not!

Allowed Options (params with * are mandatory)
| Param    | Type    | Default | Remarks                                    |
|----------|---------|---------|--------------------------------------------|
| user*    | string  | -       | user account address (CAIP)                |
| env  | string  | 'prod'      | API env - 'prod', 'staging', 'dev'|
| socketOptions      | object  | -      | supports the same as [SocketIO Options](https://socket.io/docs/v4/client-options/) |

#### **connect the socket connection object**
```typescript
epnsSDKSocket.connect();
```


#### **disconnect the socket connection object**
```typescript
epnsSDKSocket.disconnect();
```

#### **subscribing to Socket Events**
```typescript
epnsSDKSocket.on(EVENTS.CONNECT, () => {

});

epnsSDKSocket.on(EVENTS.DISCONNECT, () => {

});

epnsSDKSocket.on(EVENTS.USER_FEEDS, (feedList) => {
  // feedList is an [] containing the notification data when that notification was received
});
```

Supported EVENTS
| EVENT name | When is it triggered?                      |
|------------|--------------------------------------------|
| EVENTS.CONNECT    | whenever the socket is connected     | 
| EVENTS.DISCONNECT | whenever the socket is disconneted   | 
| EVENTS.USER_FEEDS | whenever a new notification is received by the user after the last socket connection   | 
| EVENTS.USER_SPAM_FEEDS | whenever a new spam notification is received by the user after the last socket connection   | 


### **NOTE on Addresses:**

In any of the below methods (unless explicitly stated otherwise) we accept either - 
- [CAIP format](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-10.md#test-cases): for any on chain addresses ***We strongly recommend using this address format***. 
(Example : ETH MAINNET address will be like `eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb`)

- ETH address format: only for backwards compatibility. 
(Example: `0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb`)
