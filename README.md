# EPNS-SDK

EPNS SDK is a Javascript based Monorepo of packages that helps developers to 
- build EPNS features into their DApps
- get access to EPNS Push Nodes APIs
- render EPNS Notifications UI

without having to write a lot of boilerplate code. All the heavy lifting is done by the SDK, so that you the developer can focus on building features and bootstrap a DApp with EPNS features in no time!

The SDK provides a suite of solutions for different problems. It is written in Typescript and supports React, React Native, Plain JS, Node JS based platforms. (We are adding support for more!)

*It is also built on top of standard Web3 packages like `ethers`, `@web3-react`*


## Packages available

Click on the packages to view more details.

- [@epnsproject/sdk-restapi](./packages/restapi/README.md)
- [@epnsproject/sdk-uiweb](./packages/uiweb/README.md)
- [@epnsproject/sdk-uiembed](./packages/uiembed/README.md)


## Sample Usage
*How to use a package from the SDK?*

Let's take `@epnsproject/sdk-restapi` as an example.

Open a teminal and enter
```bash
mkdir sdk-quickstart
cd sdk-quickstart

# at sdk-quickstart, hit enter for all if no change from default intended
yarn init 
```

If you want to use ES6 Modules syntax then inside `package.json` set “type” to “module”.

```bash
# install the sdk "restapi" package & its peer dependencies in your app
yarn add @epnsproject/sdk-restapi ethers

# or NPM
npm install @epnsproject/sdk-restapi ethers
```

```bash
touch main.js
```

For *CommonJS* Syntax
```typescript
// import in main.js
const EpnsAPI = require("@epnsproject/sdk-restapi"
```

**OR**

For *ES6 modules* Syntax
```typescript
// import in main.js
import * as EpnsAPI from "@epnsproject/sdk-restapi";
```

```typescript
// use a feature from restapi package,
// here "getFeeds" gets all the notifications for the user address provided
const main = async() => {
  const notifications = await EpnsAPI.user.getFeeds({
    user: 'eip155:42:0xD8634C39BBFd4033c0d3289C4515275102423681', // user address in CAIP
    env: 'staging'
  });

  // log the notifications 
  console.log('notifications: \n\n', notifications);
}

main();
```

Then to run this code open terminal and type

```bash
node main
```

## [Contributing](./contributing.md)
