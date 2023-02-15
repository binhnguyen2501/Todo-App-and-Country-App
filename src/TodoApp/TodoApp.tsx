import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import TodoTask from "./TodoTask";
import Modal from "../components/Modal";

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
  const [selectedTaskEdit, setSelectedTaskEdit] = useState<string>("");

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
        toast.success(`Successfully created ${task} task!`);
      }
    } else {
      setTodoList([...todoList, newTask]);
      setPrevTodoList([...prevTodoList, newTask]);
      setTask("");
      toast.success(`Successfully created ${task} task!`);
    }
  };

  const isConfirmAdd = (confirm: boolean): void => {
    const newTask = { id: uuidv4(), taskName: task, isComplete: false };
    if (confirm) {
      setTodoList([...todoList, newTask]);
      setPrevTodoList([...prevTodoList, newTask]);
      setTask("");
      toast.success(`Successfully created ${task} task!`);
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

  const handleDeleteTask = (taskDelete: string): void => {
    const filterTodoList = todoList.filter((task) => task.id !== taskDelete);
    setTodoList(filterTodoList);
    const filterPrevTodoList = prevTodoList.filter(
      (task) => task.id !== taskDelete
    );
    setPrevTodoList(filterPrevTodoList);
  };

  const handleEditTask = (taskEdit: string): void => {
    const updateTodoList = todoList.map((item) => {
      if (item.id === selectedTaskEdit) {
        toast.success(`Task ${item.taskName} was changed!`);
        return {
          ...item,
          taskName: taskEdit,
        };
      } else return item;
    });
    setTodoList(updateTodoList);
    setSelectedTaskEdit("");
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
              className="w-full text-lg lg:text-xl pl-6 py-3 border-0 rounded-lg focus:outline-none focus:bg-transparent active:bg-transparent bg-transparent"
            />
            <div className="flex items-center pr-6">
              <button
                disabled={!task}
                onClick={handleAddTask}
                className="w-max cursor-pointer text-[#EF4638] text-lg lg:text-xl font-bold"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {todoList.length ? (
            <div className="text-center text-lg lg:text-2xl mb-2 font-bold">
              {prevTodoList.length === 0 ? (
                <React.Fragment>There are no more tasks anymore</React.Fragment>
              ) : (
                <React.Fragment>
                  There are {prevTodoList.length < 2 && "just"}{" "}
                  <span className="text-[#EF4638]">{prevTodoList.length}</span>{" "}
                  {prevTodoList.length < 2 ? "task" : "tasks"} left out of{" "}
                  {todoList.length} tasks
                </React.Fragment>
              )}
            </div>
          ) : (
            <div className="text-center text-lg lg:text-2xl mb-2 font-bold">
              No tasks for today
            </div>
          )}

          <div className="px-4 flex flex-col gap-1 mt-1">
            {todoList.map((task: TodoList, index: number) => {
              return (
                <TodoTask
                  key={index}
                  task={task}
                  completeTask={handleCompleteTask}
                  deleteTask={handleDeleteTask}
                  selectedTaskEdit={selectedTaskEdit}
                  handleSelectedTaskEdit={(taskEdit: string) =>
                    setSelectedTaskEdit(taskEdit)
                  }
                  editTask={handleEditTask}
                />
              );
            })}
          </div>
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
          <Modal
            closeModal={setOpenModalConfirm}
            isConfirmAdd={isConfirmAdd}
            title="Confirm"
            content="Are you sure you want to add this task because it is already in the task list?"
          />
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default TodoApp;
