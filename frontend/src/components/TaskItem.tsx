import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import axios from "../utils/axios_config";
import TaskModal from "./TaskModal";

interface TaskItemProps {
  taskId: number;
  taskTitle: string;
  isCompleted: boolean;
  onTaskUpdate: (updatedTask: { id: number | undefined; title: string; completed: boolean }) => void;
  onTaskDelete: (taskId: number | undefined) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  taskId,
  taskTitle,
  isCompleted,
  onTaskUpdate,
  onTaskDelete
}) => {

  const handleTaskStatusChange = async (taskId: number, completed: boolean) => {
    try {
      const response = await axios.put(`/task/${taskId}`, {
        completed: completed
      });
      console.log('Task status updated', response.status);
      if (response.status === 200) {
        onTaskUpdate({ id: response.data?.id, title: response.data?.title, completed });
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleTaskDelete = async (taskId: number | undefined) => {
    try {
      const response = await axios.delete(`/task/${taskId}`);
      if (response.status === 200) {
        onTaskDelete(taskId);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex items-center gap-1 sm:gap-3 my-3 justify-between">
      <Checkbox
        id={String(taskId)}
        className="rounded-full p-1 sm:p-3 border-gray-600 dark:border-amber-50"
        checked={isCompleted}
        onClick={() => handleTaskStatusChange(taskId, !isCompleted)}
      />
      <Label
        htmlFor={String(taskId)}
        className="peer-data-[state=checked]:line-throgh after:bg-muted-foreground peer-data-[state=checked]:text-muted-foreground relative after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:transition-transform after:ease-in-out peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100 text-sm sm:text-4xl"
      >
        {taskTitle}
      </Label>
      <div className="flex gap-1 sm:gap-3">
        <TaskModal buttonText="Edit Task" isEditMode={true} initialTitle={taskTitle} taskId={taskId} onTaskUpdate={onTaskUpdate} />

      <Button className="text-sm sm:text-xl p-1 sm:p-3 " onClick={() => handleTaskDelete(taskId)}>
        Delete
      </Button>
      </div>
      

    </div>
  );
};

export default TaskItem;
