import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    user: "zeph@zeph.com",
    title: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    date: "25/10/2005 12:29:34 pm",
    description: "1. Visualize a Dream\n2. Write It Down\n3. Plan One Action",
    completed: "",
  },
  {
    id: 2,
    user: "zeph@zeph.com",
    author: "Robert Kiyosaki",
    title: "Your network is your net worth.",
    date: "15/11/2010 02:45:55 pm",
    description:
      "1. Cultivate Valuable Connections\n2. Nourish Relationships\n3. Prosper Together",
    completed: "true",
  },
  {
    id: 3,
    user: "zeph@zeph.com",
    author: "Bill Gates",
    title: "Your most unhappy customers are your greatest source of learning.",
    date: "12/04/1998 10:45:55 am",
    description:
      "1. Value Customer Feedback\n2. Learn from Mistakes\n3. Continuous Improvement",
    completed: "true",
  },
  {
    id: 4,
    user: "zeph@zeph.com",
    author: "Mark Zuckerberg",
    title:
      "The question I ask myself like almost every day is, 'Am I doing the most important thing I could be doing?'",
    date: "18/02/2015 03:10:15 pm",
    description:
      "1. Prioritize Your Goals\n2. Stay Focused\n3. Make Every Moment Count",
    completed: "",
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },

    updateTodo: (state, action) => {
      const { id, author, date, title, description, completed } =
        action.payload;
      const existingTodo = state.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.author = author;
        existingTodo.date = date;
        existingTodo.description = description;
        existingTodo.completed = completed;
      }
    },

    deleteTodo: (state, action) => {
      const deleteTodoId = action.payload;
      return state.filter((todo) => todo.id !== deleteTodoId);
    },

    deleteAllTodo: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, deleteAllTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
