import React from "react";

interface Props {
  task: {
    taskName: string;
    isComplete: boolean;
  };
  completeTask(taskNameComplete: string): void;
}

const TodoTask = ({ task, completeTask }: Props) => {
  return (
    <li
      onClick={() => {
        completeTask(task.taskName);
      }}
      className={`text-lg lg:text-2xl cursor-pointer ${
        task.isComplete ? "line-through" : ""
      }`}
    >
      {task.taskName}
    </li>
  );
};

export default TodoTask;
