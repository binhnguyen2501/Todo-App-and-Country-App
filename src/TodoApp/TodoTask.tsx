import React, { useState } from "react";
import toast from "react-hot-toast";
import Icon from "../components/Icon";

interface Props {
  task: {
    id: string;
    taskName: string;
    isComplete: boolean;
  };
  completeTask(taskNameComplete: string): void;
  deleteTask(taskDelete: string): void;
  selectedTaskEdit: string;
  handleSelectedTaskEdit(selectedTask: string): void;
  editTask(taskEdited: string): void;
}

const TodoTask = ({
  task,
  completeTask,
  deleteTask,
  selectedTaskEdit,
  handleSelectedTaskEdit,
  editTask,
}: Props) => {
  const [taskName, setTaskName] = useState<string>(task.taskName);

  const handleChangeTask = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.name === "task") {
      setTaskName(event.target.value);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 group">
      {selectedTaskEdit === task.id ? (
        <input
          type="text"
          name="task"
          value={taskName}
          placeholder="Task..."
          onChange={handleChangeTask}
          className="w-full border text-lg lg:text-xl pl-6 py-3 rounded-lg"
        />
      ) : (
        <div
          onClick={() => {
            completeTask(task.id);
            if (!task.isComplete) {
              toast.success(`Task ${task.taskName} was completed!`);
            }
          }}
          className={`text-lg lg:text-2xl cursor-pointer w-max flex items-center gap-3 ${
            task.isComplete ? "text-red-500" : "text-black"
          }`}
        >
          <Icon
            icon={task.isComplete ? "tick-circle" : "add-circle"}
            size={24}
            color={task.isComplete ? "red" : "black"}
          />
          {task.taskName}
        </div>
      )}

      {selectedTaskEdit === task.id ? (
        <div className="flex items-center gap-3">
          <div
            className="cursor-pointer font-medium hover:text-red-500 transition-all"
            onClick={() => {
              editTask(taskName);
            }}
          >
            Edit
          </div>
          <div
            className="cursor-pointer font-medium hover:text-red-500 transition-all"
            onClick={() => {
              handleSelectedTaskEdit("");
              setTaskName(task.taskName);
            }}
          >
            Cancel
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {!task.isComplete && (
            <div
              className="cursor-pointer hidden group-hover:block"
              onClick={() => {
                handleSelectedTaskEdit(task.id);
              }}
            >
              <Icon icon="edit-2" size={24} color="black" />
            </div>
          )}
          <div
            className="cursor-pointer hidden group-hover:block"
            onClick={() => {
              deleteTask(task.id);
              toast.success(`Task ${task.taskName} was deleted!`);
            }}
          >
            <Icon icon="trash" size={24} color="red" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoTask;
