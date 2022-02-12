import React, { useState, useCallback } from "react";
import TodoTask from "../components/TodoTask";

interface TodoList {
  taskName: string;
  isComplete: boolean;
}

const TodoApp: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [prevTodoList, setPrevTodoList] = useState<TodoList[]>([]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (event.target.name === "task") {
        setTask(event.target.value);
      }
      // ready to get another input element just with 1 function handler that
    },
    []
  );

  const handleAddTask = useCallback((): void => {
    const newTask = { taskName: task, isComplete: false };
    setTodoList([...todoList, newTask]);
    setPrevTodoList([...prevTodoList, newTask]);
    setTask("");
  }, [task, todoList, prevTodoList]);

  const handleCompleteTask = (taskNameComplete: string): void => {
    // show how many task was complete from all tasks
    setPrevTodoList(
      prevTodoList.filter((task) => {
        return task.taskName !== taskNameComplete;
      })
    );
    // check task was complete
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.taskName === taskNameComplete
          ? { ...todo, isComplete: true }
          : todo
      )
    );
  };

  return (
    <>
      <div className="text-center my-6 text-[#EF4638] text-4xl font-extrabold">
        Todo list
      </div>
      <div className="w-1/2 my-0 mx-auto">
        <div className="flex justify-center w-full">
          <div className="border-[1px] border-[#EFEFEF] rounded-lg w-full flex">
            <input
              type="text"
              name="task"
              value={task}
              placeholder="Task..."
              onChange={handleChange}
              className="w-full text-xl pl-6 py-3 border-0 rounded-lg focus:outline-none"
            />
            <button
              disabled={!task}
              onClick={handleAddTask}
              className="w-40 cursor-pointer text-[#EF4638] text-xl font-bold"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-center text-2xl mb-2 font-bold">
            There are{" "}
            <span className="text-[#EF4638]">{prevTodoList.length}</span> tasks
            left out of {todoList.length} tasks
          </div>
          <ul className="list-disc">
            {todoList.map((task: TodoList, index: number) => {
              return (
                <TodoTask
                  key={index}
                  task={task}
                  completeTask={handleCompleteTask}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoApp;
