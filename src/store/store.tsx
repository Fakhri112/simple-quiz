import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slice/quiz.slice";

const store = configureStore({ reducer: { quizzes: quizReducer } });
export default store;
export type RootState = ReturnType<typeof store.getState>;
