import React from "react";
import { Link } from "react-router-dom";
import EditTask from "../EditTask/EditTask";
import "./TaskList.css"; 
const TaskList = ({ tasks, selectTask, editTask, deleteTask }) => {
 
  return (
    <>
      <div className="task-list">
        <div className="task-list-header">
          <h2>Task List</h2>
          <Link to="/" className="create-task-link">
            + Create Task
          </Link>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div>
                {task.title} - {task.status} - {task.dueDate}
              </div>
              <div className="task-edit-delete">
                <button onClick={() => editTask(task)}>Edit</button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectTask && (
        <EditTask
          task={selectTask}
          updateTask={editTask} 
        />
      )}
    </>
  );
};

export default TaskList;
    