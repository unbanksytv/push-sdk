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

Import in your file
```typescript
import { NotificationItem, chainNameType } from "@epnsproject/sdk-uiweb";
```

Inside JSX,

After you get the Notification data from the [API](../restapi/README.md#fetching-notifications) or otherwise


```
<div>
{notifs.map((oneNotification, i) => {
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