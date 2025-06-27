import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "../utils/axios_config";

interface TaskFormProps {
  buttonText: string;
  taskId?: number;
  initialTitle?: string;
  isEditMode?: boolean;
  onTaskAdd?: (newTask: { id: number | undefined; title: string; completed: boolean }) => void;
  onTaskUpdate?: (updatedTask: { id: number | undefined; title: string; completed: boolean }) => void;
}

const TaskModal: React.FC<TaskFormProps> = ({ buttonText, taskId, initialTitle, isEditMode, onTaskAdd, onTaskUpdate }) => {
  const [taskTitle, setTaskTitle] = useState(initialTitle || "");

  const handleTaskSubmit = async (taskId: number | undefined, taskTitle: string) => {
    try {
      if (isEditMode) {
        const response = await axios.put(`/task/${taskId}`, {
          title: taskTitle,
        });
        if (response.status === 200) {
          setTaskTitle("");
          onTaskUpdate?.({ id: response.data?.id, title: response.data?.title, completed: response.data?.completed });
          setTaskTitle("");
        }
      } else {
        const response = await axios.post(`/task/`, {
          title: taskTitle,
        });
        if (response.status === 200) {
          setTaskTitle("");
          const newTask = { id: response.data?.id, title: response.data?.title, completed: response.data?.completed };
          onTaskAdd?.(newTask); // Use optional chaining to avoid errors
        }
      }
    } catch (error) {
      console.error("Error handling task submission:", error);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="text-sm sm:text-xl p-1 sm:p-3">{buttonText}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure? {isEditMode ? "Update task" : "Create new task"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Input
                placeholder="Enter Task"
                className="m-2 text-black dark:text-white placeholder:text-gray-400"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setTaskTitle("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() =>{ handleTaskSubmit(taskId, taskTitle)
            setTaskTitle("");
            }
            }>
              {isEditMode ? "Update Task" : "Create Task"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TaskModal;
