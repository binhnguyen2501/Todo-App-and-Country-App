import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import TodoTask from "../components/TodoTask";
import ConfirmModal from "../components/ConfirmModal";

interface TodoList {
  id: string;
  taskName: string;
  isComplete: boolean;
}

const TODO_APP_STORAGE_KEY = "TODO_APP";
const TODO_APP_TASK_DONE_STORAGE_KEY = "TODO_APP_TASK_NOT_DONE";

const TodoApp: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [prevTodoList, setPrevTodoList] = useState<TodoList[]>([]);
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);

  useEffect(() => {
    const storageTodoList: any = localStorage.getItem(TODO_APP_STORAGE_KEY);
    const storageTodoTaskDone: any = localStorage.getItem(
      TODO_APP_TASK_DONE_STORAGE_KEY
    );
    if (storageTodoList && storageTodoTaskDone) {
      setTodoList(JSON.parse(storageTodoList));
      setPrevTodoList(JSON.parse(storageTodoTaskDone));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem(
      TODO_APP_TASK_DONE_STORAGE_KEY,
      JSON.stringify(prevTodoList)
    );
  }, [prevTodoList]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    }
    // ready to get another input element just with 1 function handler that
  };

  const handleAddTask = (): void => {
    const newTask = { id: uuidv4(), taskName: task, isComplete: false };
    if (todoList.length !== 0) {
      const duplicateTask = todoList.find((item) => item.taskName === task);
      if (duplicateTask) {
        setOpenModalConfirm(true);
      } else {
        setTodoList([...todoList, newTask]);
        setPrevTodoList([...prevTodoList, newTask]);
        setTask("");
        toast.success("Successfully created task!");
      }
    } else {
      setTodoList([...todoList, newTask]);
      setPrevTodoList([...prevTodoList, newTask]);
      setTask("");
      toast.success("Successfully created task!");
    }
  };

  const isConfirmAdd = (confirm: boolean): void => {
    const newTask = { id: uuidv4(), taskName: task, isComplete: false };
    if (confirm) {
      setTodoList([...todoList, newTask]);
      setPrevTodoList([...prevTodoList, newTask]);
      setTask("");
    }
  };

  const handleCompleteTask = (taskNameComplete: string): void => {
    // show how many task was complete from all tasks
    setPrevTodoList(
      prevTodoList.filter((task) => {
        return task.id !== taskNameComplete;
      })
    );
    // check task was complete
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === taskNameComplete ? { ...todo, isComplete: true } : todo
      )
    );
  };

  return (
    <React.Fragment>
      <div className="text-center my-6 text-[#EF4638] text-4xl font-extrabold">
        What's the Plan for Today?
      </div>
      <div className="my-0 mx-auto w-11/12 lg:w-1/2">
        <div className="flex justify-center w-full">
          <div className="border-[1px] border-[#EFEFEF] rounded-lg w-full flex">
            <input
              type="text"
              name="task"
              value={task}
              placeholder="Task..."
              onChange={handleChange}
              className="w-full text-lg lg:text-xl pl-6 py-3 border-0 rounded-lg focus:outline-none"
            />
            <button
              disabled={!task}
              onClick={handleAddTask}
              className="w-40 cursor-pointer text-[#EF4638] text-lg lg:text-xl font-bold"
            >
              Add
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-center text-lg lg:text-2xl  mb-2 font-bold">
            There are{" "}
            <span className="text-[#EF4638]">{prevTodoList.length}</span> tasks
            left out of {todoList.length} tasks
          </div>
          <ul className="list-disc px-4">
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
      <AnimatePresence
        //Disable any initial animations on children that are present when the component is first rendered
        initial={false}
        //Only render one component at a time
        //The exiting component will finish its exit animation before entering component is rendered
        exitBeforeEnter={true}
      >
        {openModalConfirm && (
          <ConfirmModal
            closeModal={setOpenModalConfirm}
            isConfirmAdd={isConfirmAdd}
          />
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default TodoApp;
