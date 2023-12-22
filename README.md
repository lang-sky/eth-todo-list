## Steps to run

```bash
yarn
rm -rf build && npx truffle build && npx truffle migrate --reset
```

update `src/config.js/TODO_LIST_ADDRESS`

```bash
yarn start
```

```bash
npx truffle console
truffle(development)>
TodoList.deployed().then(instance => { app = instance; });
app
app.taskCount()
app.tasks(1)
.exit
```

## Reference

https://www.dappuniversity.com/articles/ethereum-dapp-react-tutorial
