# uiweb

Package for React based UI web components to be used by dApp.

## How to use in your app?

### Installation
```
  yarn add @epnsproject/sdk-uiweb
```
  or
```
  npm install @epnsproject/sdk-uiweb  
```
<br />

***Note:***  `styled-components` is a `peerDependency`. Please install it in your dApp if you don't have it already!
```
  yarn add styled-components
```
  or
```
  npm install styled-components  
```

<br />

### Notification Item component

Import the sdk package in the component file where you want to render notification(s)
```typescript
import { NotificationItem, chainNameType } from "@epnsproject/sdk-uiweb";
```

After you get the Notification data from the [API](../restapi/README.md#fetching-user-notifications) or otherwise

```typescript
const notifications = await EpnsAPI.user.getFeeds({
  user: '0xabc123', // user address
  chainId: 1 // ETH network chain ID
});
```

render the Notification UI as follows
```typescript
<div>
{notifications.map((oneNotification, i) => {
    const { 
        cta,
        title,
        message,
        app,
        icon,
        image,
        url,
        blockchain,
        notification
    } = oneNotification;

    return (
        <NotificationItem
            key={id} // any unique id
            notificationTitle={title}
            notificationBody={message}
            cta={cta}
            app={app}
            icon={icon}
            image={image}
            url={url}
            theme={theme}
            chainName={blockchain}
            // chainName={blockchain as chainNameType} // if using Typescript
        />
        );
    })}
</div>
```
For Spam data [API](../restapi/README.md#fetching-user-spam-notifications)

```typescript
const spams = await EpnsAPI.user.getFeeds({
  user: '0xabc123', // user address,
  spam: true,
  chainId: 1 // ETH network chain ID
});
```

render the Spam UI as follows
```
 {spams.map((oneNotification, i) => {
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

    return (
      <NotificationItem
        key={`spam-${i}`}
        notificationTitle={title}
        notificationBody={message}
        cta={cta}
        app={app}
        icon={icon}
        image={image}
        url={url}
        theme={theme}
        chainName={blockchain}
        // optional parameters for rendering spams
        isSpam
        subscribeFn={subscribeFn} // see below
        isSubscribedFn={isSubscribedFn} // see below
      />
    );
  })}
```

```
const subscribeFn = async () => {
  // opt in to the spam notification item channel
}
```
we can use this `@epnsproject/sdk-restapi` method to do that - [subscribe](../restapi/README.md#opt-in-to-a-channel)


```
const isSubscribedFn = async () => {
  // return boolean which says whether the channel for the 
  // spam notification item is subscribed or not by the user.
}
```
we can use this `@epnsproject/sdk-restapi` method to find out that - [getSubscriptions](../restapi/README.md#fetching-user-subscriptions)

where

| Prop    | Type    | Remarks                                    |
|----------|--------|--------------------------------------------|
| notificationTitle    | string  | Title of the notification (given during notification creation)    |
| notificationBody     | number  | Message body of the notification (given during notification creation) |
| icon | string  | Channel Icon (IPFS url) (given during channel setup)     |
| app  | string  | Channel Name (given during channel setup)    |
| cta      | string | Call To Action Link (given during notification creation)  |
| image      | string | Any media link (given during notification creation) |
| url      | string | Channel Link (given during channel setup)   |
| chainName      | string | Can be anyone of the following blockchain networks on which the notification was sent - "ETH_MAINNET", "ETH_TEST_KOVAN", "POLYGON_MAINNET", "POLYGON_TEST_MUMBAI", "THE_GRAPH" |
| theme      | string | 'light' or 'dark' (customization to be given by the dApp)  |
| isSpam      | boolean | whether a spam notification or not   |
| subscribeFn  | Promise | Function to subscribe to the channel  |
| isSubscribedFn  | Promise | Function that returns the subscription status of a channel   |