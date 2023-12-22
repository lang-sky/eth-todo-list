import { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";
import TodoList from "./components/TodoList";

function App() {
  const [account, setAccount] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    console.log("accounts", accounts);
    setAccount(accounts[0]);

    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    console.log("todoList", todoList);
    setTodoList(todoList);

    const balance = await web3.eth.getBalance(accounts[0]);
    console.log("balance", balance);

    const taskCount = await todoList.methods.taskCount().call();
    console.log(`taskCount:_${taskCount}_`);
    setTaskCount(taskCount);

    const tasks = [];
    for (let i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call();
      tasks.push(task);
    }
    console.log("tasks", tasks);
    setTasks(tasks);
  }

  function createTask(content) {
    setLoading(true);
    todoList.methods
      .createTask(content)
      .send({ from: account, gas: 672197, gasPrice: "30000000000" })
      .once("receipt", (receipt) => {
        console.log("create receipt", receipt);
        loadBlockchainData();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function toggleCompleted(taskId) {
    console.log("taskId", taskId);
    setLoading(true);
    todoList.methods
      .toggleCompleted(taskId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log("receipt", receipt);
        loadBlockchainData();
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  return (
    <div className="container">
      <h1>Hello, World!</h1>
      <p>Your account: {account}</p>

      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/free-download"
          target="_blank"
        >
          Dapp University | Todo List
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small>
              <a className="nav-link" href="#">
                <span id="account"></span>
              </a>
            </small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex justify-content-center">
            {loading ? (
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
            ) : (
              <TodoList tasks={tasks} createTask={createTask} toggleCompleted={toggleCompleted} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
