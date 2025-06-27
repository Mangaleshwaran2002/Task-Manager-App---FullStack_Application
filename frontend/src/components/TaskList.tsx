import { useEffect, useState } from "react";
import axios from "../utils/axios_config";
import TaskItem from './TaskItem';

import TaskModal from "./TaskModal";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasksFromAPI = () => {
    axios
      .get("/task")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  useEffect(() => {
    fetchTasksFromAPI();
  }, []);

  const handleAddTask = (newTask: { id: number | undefined; title: string; completed: boolean }) => {
    setTasks([...tasks, newTask as Task]); // Cast to Task since id will be defined after creation
  };

  const handleUpdateTask = (updatedTask: { id: number | undefined; title: string; completed: boolean }) => {
    if (updatedTask.id === undefined) {
      console.error("Task ID is undefined. Cannot update.");
      return;
    }

  // Cast updatedTask to a Task, assuming id is guaranteed to be a number at this point.
  const validUpdatedTask = { ...updatedTask, id: updatedTask.id as number };
  setTasks(tasks.map((task) =>
    task.id === validUpdatedTask.id ? validUpdatedTask : task
  ));
};


  const handleDeleteTask = (taskId: number | undefined) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex gap-4 flex-col w-fit sm:w-2/4">
      
      <TaskModal buttonText="Create New Task" onTaskAdd={handleAddTask} />
      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            taskId={task.id}
            taskTitle={task.title}
            isCompleted={task.completed}
            onTaskUpdate={handleUpdateTask}
            onTaskDelete={handleDeleteTask}
          />
        ))}

      </div>
    </div>
  );
};

export default TaskList;
