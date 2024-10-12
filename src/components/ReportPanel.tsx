import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
	emptyAnswer,
	resetLoggedUserData,
	setAnswers,
	setGameState,
} from "@/store/slice/quiz.slice";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ReportPanel = () => {
	const dispatch = useDispatch();
	const { answer, getLoggedUserData } = useSelector(
		(state: RootState) => state.quizzes,
	);
	const navigate = useNavigate();

	useEffect(() => {
		const { quizzes, username } = getLoggedUserData;
		if (quizzes.length == 0) return;
		dispatch(setAnswers(answer));
		const loggedUser = {
			currentGameState: "rule",
			username,
			endQuizEpochTime: 0,
			quizzes: [],
			answer: [],
		};
		localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
	}, []);

	const handleTryAgain = () => {
		dispatch(emptyAnswer());
		dispatch(resetLoggedUserData());
		dispatch(setGameState("rule"));
	};
	const handleLogOut = () => {
		localStorage.removeItem("loggedUser");
		localStorage.removeItem("gameState");
		navigate("/");
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader className="flex flex-row items-center justify-between">
				<h2 className="text-xl font-semibold">Quiz Completed!</h2>
			</CardHeader>
			<CardContent>
				<div className="space-y-4 p-2">
					<p className="text-2xl">
						Your correct answer:{" "}
						<b>{answer.filter((x) => x === true).length}</b>
					</p>
					<p className="text-2xl">
						Your false answer: <b>{answer.filter((x) => x === false).length}</b>
					</p>
					<p className="text-2xl">
						Answered questions: <b>{answer.length}</b>
					</p>
					<p className="text-2xl">
						Unanswered questions: <b>{15 - answer.length}</b>
					</p>
				</div>
				<div className="mt-7 w-full flex justify-between">
					<Button variant={"link"} onClick={handleLogOut}>
						Log Out
					</Button>
					<Button onClick={handleTryAgain}>Restart Quiz</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default ReportPanel;
