import { createSlice } from "@reduxjs/toolkit";
import { ILoggedUserData, InitQuizState } from "@/types/types";

const initialState: InitQuizState = {
	quizzes: {
		response_code: 0,
		results: [
			{
				type: "",
				difficulty: "",
				category: "",
				question: "",
				correct_answer: "",
				incorrect_answers: [""],
			},
		],
	},
	answer: [],
	gameState: "",
	getLoggedUserData: {
		currentGameState: "",
		username: "",
		endQuizEpochTime: 0,
		quizzes: [],
		answer: [],
	},
};

const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		setAnswers: (state, { payload }) => {
			state.answer = payload;
		},
		storeQuizzesData: (state, { payload }) => {
			state.quizzes = payload;
		},
		setGameState: (state, { payload }) => {
			state.gameState = payload;
			localStorage.setItem("gameState", payload);
		},
		pushAnswer: (state, { payload }) => {
			state.answer.push(Boolean(payload));
		},
		emptyAnswer: (state) => {
			state.answer = [];
		},
		getLocalStorageData: (state) => {
			const getLoggedUserData: ILoggedUserData = JSON.parse(
				localStorage.getItem("loggedUser") as string,
			);
			state.getLoggedUserData = getLoggedUserData;
		},
		resetLoggedUserData: (state) => {
			state.getLoggedUserData = {
				...state.getLoggedUserData,
				currentGameState: "rule",
				endQuizEpochTime: 0,
				quizzes: [],
				answer: [],
			};
		},
	},
});

export const {
	pushAnswer,
	storeQuizzesData,
	emptyAnswer,
	setGameState,
	getLocalStorageData,
	setAnswers,
	resetLoggedUserData,
} = quizSlice.actions;
export default quizSlice.reducer;
