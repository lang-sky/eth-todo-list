pragma solidity >=0.7.0 <0.9.0;

contract Todo {
    // Total tasks in the list & next task id.
    uint256 public taskCount = 0;

    // Defining structure of a task object.
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    // create a map of tasks.
    mapping(uint256 => Task) public tasks;

    // event definitions for actions on the todo list
    event TaskCreated(uint256 id, string content, bool completed);

    event TaskCompleted(uint256 id, bool completed);

    constructor() {
        // create a new task on contract deployment.
        // createTask("Task to be completed.");
    }

    // Creates a new task with a given description.
    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        // fire an event.
        emit TaskCreated(taskCount, _content, false);
    }

    // Marks a task as completed
    function toggleCompleted(uint256 _id) public {
        Task storage _task = tasks[_id];
        require(_id <= taskCount && _id > 0, "Invalid task ID");
        _task.completed = !_task.completed;
        tasks[_id] = _task;

        emit TaskCompleted(_id, _task.completed);
    }
}
