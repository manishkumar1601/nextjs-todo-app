"use client";

import TodoList from "@/components/TodoList";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxStore";
import {
  useCreateTodoMutation,
  useDeleteAllTodosMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "@/store/apis/todoApi";
import { addTodo, deleteAllTodos, deleteTodo, setTodos, updateTodo } from "@/store/slices/todoSlice";
import { FormEvent, useEffect, useState } from "react";
import SpinnerImage from "/public/spinner.svg";
import Image from "next/image";
import { toast } from "sonner";
import AddTodoForm from "./AddTodoForm";

const DashboardPage = () => {
  const userData: any = useAppSelector((state) => state?.auth?.userData);
  const [inputValue, setInputValue] = useState("");
  const [createTodo] = useCreateTodoMutation();
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state?.todo?.todos);
  const { data: todos, isLoading } = useGetTodosQuery(userData?.id ?? "", {
    skip: !userData?.id,
  });
  const [updateTodoApi] = useUpdateTodoMutation();
  const [deleteTodoApi] = useDeleteTodoMutation();
  const [deleteAllTodoApi] = useDeleteAllTodosMutation();

  useEffect(() => {
    if (todos?.data?.length && todos?.success) {
      dispatch(setTodos(todos?.data));
    }
    setTimeout(() => {}, 5000);
  }, [todos, dispatch]);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    event?.stopPropagation();

    if (!inputValue) return;

    const payload = {
      content: inputValue,
      isCompleted: false,
      userId: userData?.id,
    };

    const response = await createTodo(payload).unwrap();

    if (response?.success) {
      dispatch(addTodo(response?.data));
      toast.success("Todo added successfully");
    }
    setInputValue("");
  }

  async function handleCheckTodo(id: string) {
    if (!id) return;
    const payload = {
      id,
      isCompleted: !todoList?.find((todo) => todo?.id === id)?.isCompleted,
    };
    const response = await updateTodoApi(payload).unwrap();
    if (response?.success) {
      dispatch(updateTodo(response?.data));
      toast.success("Todo updated successfully");
    }
  }

  async function handleDeleteTodo(id: string) {
    if (!id) return;
    const payload = {
      id
    }
    const response = await deleteTodoApi(payload).unwrap();
    if (response?.success) {
      dispatch(deleteTodo(id));
      toast.success(response?.message);
    }
  }

  async function handleClearAll() {
    const response: any = await deleteAllTodoApi().unwrap();
    if (response?.success) {
      dispatch(deleteAllTodos());
      toast.success(response?.message);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Image src={SpinnerImage} alt="Loading" className="w-24 h-24" />
      </div>
    );
  }

  return (
    <>
      <section className="flex-1 bg-gray-100 w-full h-full">
        <section className="flex flex-col items-center gap-6 max-w-lg mx-auto">
          <h1 className="text-4xl font-bold">Todo List</h1>
          <AddTodoForm
            inputValue={inputValue}
            handleFormSubmit={handleFormSubmit}
            setInputValue={setInputValue}
          />
          <button
            type="button"
            className="bg-red-600 font-bold rounded-md px-4 py-2 text-white cursor-pointer"
            onClick={handleClearAll}
          >
            Clear All
          </button>
          {todoList.length > 0 && (
            <ul>
              {todoList.map((todo) => (
                <TodoList
                  key={todo?.id}
                  todo={todo}
                  handleCheckTodo={handleCheckTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))}
            </ul>
          )}
        </section>
      </section>
    </>
  );
};

export default DashboardPage;
