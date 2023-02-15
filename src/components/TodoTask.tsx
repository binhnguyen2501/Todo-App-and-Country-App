import React from "react";
import toast from "react-hot-toast";

interface Props {
  task: {
    id: string;
    taskName: string;
    isComplete: boolean;
  };
  completeTask(taskNameComplete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <li
      onClick={() => {
        completeTask(task.id);
        if (!task.isComplete) {
          toast.success(`Task ${task.taskName} was completed!`);
        }
      }}
      className={`text-lg lg:text-2xl cursor-pointer w-max ${
        task.isComplete ? "line-through" : ""
      }`}
    >
      {task.taskName}
    </li>
  );
};

export default TodoTask;
