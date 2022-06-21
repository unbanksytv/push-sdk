# Contributing

(WIP)

## Repo Setup
```
git clone https://github.com/ethereum-push-notification-service/epns-sdk.git

cd epns-sdk
```

```
yarn install
```
***Note*** -
We are using `yarn` and **strongly** advise to use yarn 1.x to avoid any NPM issues.

## Running the Demo React App
We have a `demoreact` playground to test the individual packages being built out. To run the `demoreact` app
### By GUI (preferred)
1. click on the NX console extension icon in the VSCode sidebar.
2. click on the `build` target execute icon under `demoreact`
3. click on the `serve` target execute icon under `demoreact`
4. wait for the localhost to be ready in the terminal & then hit `http://localhost:4200/` on your browser to run the app.

## Pull Requests process
- All changes should be requested through PRs from a feature/bug branch to `main` branch.
- We are using 
   - [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/#summary): to follow [semver](https://semver.org/#summary) for npm package versioning
   - [commitizen](https://github.com/commitizen/cz-cli) to restrict commits to follow conventional commits
   - [husky](https://typicode.github.io/husky/#/) to run pre-commit checks

So, use `yarn cz` to commit changes after `git add` (recommended) or hand crafted git commit messages to follow conventional commit. Otherwise the CLI will prevent you from committing code.

### How to add commits which will decide versioning when deploying
When you are ready to commit your changes.

Run
```
git add -A
```

then 

```
yarn cz
```

this will pop up the below CLI

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

Read through the [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) and [semver](https://semver.org/#summary) to get a better understanding for selecting which option.

### General guideline
* for bug fixes use `fix`
* for backward compatible new features use `feat`

## NX 
We are using [NX](https://nx.dev/getting-started/intro) and some NX plugins for monorepo management, verison & publish.

### NX console
The repo comes in with a baked in NX console and some other VSCode extensions to -
* help simplify processes like build, lint, test, run demo apps
* run scripts on affected parts of the codebase

***Note*** -
<span style="color:red">Don't run CI-prefixed targets in the NX console in local, they are only for CI.</span>.

## Adding new packages 
The NX monorepo uses `project.json` & `package.json` to manage the monorepo workspace and also ultimately build out the bundle that will be published to NPM registry.

### - adding `dependencies` to a package
at root, simply run 
```
yarn add "dependency_package_name@x.y.z"
```
And then simply import that dependency in your package. NX while running `build` for that package will take care of making it a `dependency` in the final bundle.

### - adding `devDependencies` to a package
at root, simply run 
```
yarn add -D "dependency_package_name@x.y.z"
```
And then simply import that dependency in your package. NX while running `build` for that package will take care of making it a `devDependency` in the final bundle.

### - adding `peerDependencies` to a package
at root, simply run 
```
yarn add "dependency_package_name@x.y.z"
```
And then simply import that dependency in your package. In the `package.json` of the package where you want to consume it, simply declare the dependency as `peerDependency`
NX while running `build` for that package will take care of making it a `peerDependency` in the final bundle.

