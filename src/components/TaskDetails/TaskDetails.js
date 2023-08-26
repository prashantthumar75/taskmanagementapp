import React, { useState } from "react";
import "../TaskDetails/TaskDetails.css"; 

const TaskDetails = ({ task, updateTaskStatus }) => {
  const [newStatus, setNewStatus] = useState(task.status);

  const handleStatusChange = () => {
    updateTaskStatus(task.id, newStatus);
  };

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="task-details">
      <h2>Task Details</h2>
      <div>
        <h3>{task.title}</h3>
        <p>Description: {task.description}</p>
        <p>Due Date: {task.dueDate}</p>
        <p>Status: {task.status}</p>

        <label>
          Update Status:
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <button onClick={handleStatusChange}>Update Status</button>
      </div>
    </div>
  );
};

export default TaskDetails;
