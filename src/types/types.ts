interface QuizQuestion {
	type: string;
	difficulty: string;
	category: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

interface QuizResponse {
	response_code: number;
	results: QuizQuestion[];
}

interface QuizPanel {
	currentQuestion: number;
	questions: QuizQuestion;
}

interface InitQuizState {
	quizzes: QuizResponse;
	answer: boolean[];
	gameState: "rule" | "quiz" | "report" | "";
	getLoggedUserData: ILoggedUserData;
}

interface ILoggedUserData {
	username: string;
	endQuizEpochTime: number;
	quizzes: any[];
	answer: boolean[];
	currentGameState: "rule" | "quiz" | "report" | "";
}

export type {
	QuizResponse,
	QuizQuestion,
	InitQuizState,
	ILoggedUserData,
	QuizPanel,
};
