import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../EditTask/EditTask.css";
const EditTask = ({ task, updateTask }) => {
  const taskId = task.id;

  const [formData, setFormData] = useState({
    id: taskId,
    title: task ? task.title : "",
    description: task ? task.description : "",
    dueDate: task ? task.dueDate : "",
    status: task ? task.status : "To Do",
  });

  useEffect(() => {
    setFormData({
      id: taskId,
      title: task ? task.title : "",
      description: task ? task.description : "",
      dueDate: task ? task.dueDate : "",
      status: task ? task.status : "To Do",
    });
  }, [taskId, task]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(formData);
    window.location.href = "/tasklist";
  };

  return (
    <div className="edit-task-container">
      <h2 className="edit-task-heading">Edit Task</h2>
      <form className="edit-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="edit-task-input"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          className="edit-task-textarea"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="date"
          name="dueDate"
          className="edit-task-input"
          value={formData.dueDate}
          onChange={handleInputChange}
        />
        <select
          name="status"
          className="edit-task-select"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" className="edit-task-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditTask;
