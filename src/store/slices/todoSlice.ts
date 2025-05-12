import { Todo } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  todos: Todo[];
} = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos[index] = action.payload;
    },
    deleteTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(index, 1);
    },
    deleteAllTodos: (state) => {
      state.todos = [];
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo, deleteAllTodos } = todoSlice.actions;
export default todoSlice;
