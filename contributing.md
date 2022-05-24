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
We are using `yarn` and strongly advise to use yarn to avoid any NPM issues.


## Pull Requests process
- All changes should be requested through PRs from a feature/bug branch to `main` branch.
- We are using 
   - [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/#summary): to follow semver for npm package versioning
   - [commitizen](https://github.com/commitizen/cz-cli) to restrict commits to follow conventional commits
   - [husky](https://typicode.github.io/husky/#/) to run pre-commit checks

So, use `yarn cz` to commit changes after `git add` (recommended) or hand crafted git commit messages to follow conventional commit. Otherwise the CLI will prevent you from committing code.


