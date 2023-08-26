import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateTask from "./components/CreateTask/CreateTask";
import EditTask from "./components/EditTask/EditTask";
import TaskList from "./components/TaskList/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const createTask = (newTask) => {
    const taskId = Math.random().toString(36).substring(7);
    newTask.id = taskId;

    setTasks([...tasks, newTask]);

    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const editTask = (editedTask) => {
    const updatedTasks = tasks.map((task) =>
    task.id === editedTask.id ? editedTask : task
    );
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setSelectedTask(editedTask); 
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateTask addTask={createTask} />} />
          <Route
            path="/edit-task/:id"
            element={<EditTask task={selectedTask} editTask={editTask} />}
          />
          <Route
            path="/tasklist"
            element={
              <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                editTask={editTask}
                selectTask={selectedTask}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
