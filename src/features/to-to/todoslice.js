// import { createSlice, nanoid } from "@reduxjs/toolkit";

// const initialState = {
//   todos: [
//     { 
//       id: nanoid(), 
//       text: "buy milk", 
//       completed: false 
//     }
//   ],
// };

// export const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     addtodo: (state, action) => {
//       const newTodo = {
//         id: nanoid(),
//         text: action.payload,
//         completed: false,
//       };
//       state.todos.push(newTodo);
//     },
//     removetodo: (state, action) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload);
//     },
//   },
// });

// export const { addtodo, removetodo } = todoSlice.actions;
// export default todoSlice.reducer;
