import React, { useState } from "react";
import "../CreateTask/CreateTask.css";

const CreateTask = ({ addTask }) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "To Do",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (state.title.trim() === "") {
      newErrors.title = "Title is required.";
    }

    if (state.dueDate.trim() === "") {
      newErrors.dueDate = "Due Date is required.";
    }

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Create a new task object
      const newTask = {
        title: state.title,
        description: state.description,
        dueDate: state.dueDate,
        status: state.status,
      };

      // Store the task in local storage
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      // Add the new task to the state
      addTask(newTask);

      // Clear the form
      setState({
        title: "",
        description: "",
        dueDate: "",
        status: "To Do",
      });

      window.location.href = "/tasklist";
    }
  };

  return (
    <>
      <br />
      <div className="create-task">
        <h2>Create Task</h2>
        <form className="create-task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            className="create-task-title-input"
            placeholder="Title"
            value={state.title}
            onChange={handleInputChange}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
          <textarea
            name="description"
            className="create-task-description-textarea"
            placeholder="Description"
            value={state.description}
            onChange={handleInputChange}
          ></textarea>
          <input
            type="date"
            name="dueDate"
            className="create-task-dueDate-input"
            value={state.dueDate}
            onChange={handleInputChange}
          />
          {errors.dueDate && <p className="error-message">{errors.dueDate}</p>}
          <select
            name="status"
            className="create-task-status-select"
            value={state.status}
            onChange={handleInputChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button type="submit" className="create-task-create-button">
            Create
          </button>
          <br />
        </form>
      </div>
    </>
  );
};

export default CreateTask;
