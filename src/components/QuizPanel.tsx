import { RootState } from "@/store/store";
import type { QuizPanel } from "../types/types";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { secondsToFormattedString } from "@/utils/formatTime";
import {
	pushAnswer,
	setAnswers,
	setGameState,
	storeQuizzesData,
} from "@/store/slice/quiz.slice";
import parse from "html-react-parser";

const QuizPanel = () => {
	const { getLoggedUserData, gameState, answer } = useSelector(
		(state: RootState) => state.quizzes,
	);
	const quizzes = useSelector(
		(state: RootState) => state.quizzes.quizzes.results,
	);
	const [currentQuestion, SetCurrentQuestion] = useState(0);
	const [selectedAnswer, SetSelectedAnswer] = useState("");
	const [timeLeft, SetTimeLeft] = useState(120);
	const endQuizEpochTime = useMemo(() => Date.now() + 120000, []);
	const dispatch = useDispatch();

	useEffect(() => {
		const { quizzes, endQuizEpochTime, answer } = getLoggedUserData;
		if (quizzes.length == 0) return;
		dispatch(
			storeQuizzesData({
				response_code: 0,
				results: [...quizzes],
			}),
		);
		dispatch(setAnswers(answer));
		SetTimeLeft(Math.round((endQuizEpochTime - Date.now()) / 1000));
		SetCurrentQuestion(answer.length);
	}, []);

	useEffect(() => {
		if (gameState === "quiz" && timeLeft > 0) {
			const timer = setTimeout(() => SetTimeLeft(timeLeft - 1), 1000);
			return () => clearTimeout(timer);
		} else if (timeLeft <= 0) {
			handleFinish();
		}
	}, [timeLeft]);

	const handleNext = () => {
		if (quizzes[currentQuestion].correct_answer == selectedAnswer)
			dispatch(pushAnswer(true));
		else dispatch(pushAnswer(false));
		SetSelectedAnswer("");
		if (currentQuestion == quizzes.length - 1) return handleFinish();
		SetCurrentQuestion(currentQuestion + 1);
	};

	const handleFinish = () => {
		SetCurrentQuestion(0);
		SetTimeLeft(0);
		dispatch(setGameState("report"));
	};

	window.addEventListener("beforeunload", function () {
		const gameState = localStorage.getItem("gameState");
		if (gameState != "quiz") return;
		const loggedUser = {
			currentGameState: "quiz",
			username: getLoggedUserData.username,
			endQuizEpochTime:
				getLoggedUserData.endQuizEpochTime == 0
					? endQuizEpochTime
					: getLoggedUserData.endQuizEpochTime,
			quizzes,
			answer,
		};
		localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
	});

	return (
		<Card className="md:w-[600px] w-full mx-auto">
			<CardHeader className="flex flex-row items-center justify-between relative">
				<h2 className="text-xl font-semibold">
					Question {currentQuestion + 1}
				</h2>
				<p className="font-semibold w-32 text-center text-2xl absolute right-5 shadow-xl -top-16 rounded bg-white p-6">
					{secondsToFormattedString(timeLeft)}
				</p>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<p className="text-lg">{parse(quizzes[currentQuestion].question)}</p>
					<RadioGroup
						className="mb-5"
						value={selectedAnswer}
						onValueChange={SetSelectedAnswer}>
						{[
							...quizzes[currentQuestion].incorrect_answers,
							quizzes[currentQuestion].correct_answer,
						]
							.sort()
							.map((option, index) => (
								<div key={index} className="flex items-center space-x-2 mt-2">
									<RadioGroupItem value={option} id={option} />
									<Label htmlFor={option}>{parse(option)}</Label>
								</div>
							))}
					</RadioGroup>
					<div className="w-full flex justify-end items-center relative mt-5">
						<p className="font-semibold w-32 text-center text-2xl absolute shadow-[rgba(0,0,15,0.5)_0px_-2px_8px_-1px] left-0 -bottom-16 rounded bg-white p-6">{`${
							currentQuestion + 1
						}/${quizzes.length}`}</p>
						<Button
							className="p-5"
							onClick={handleNext}
							disabled={!selectedAnswer}>
							{currentQuestion < quizzes.length - 1 ? "Next" : "Finish"}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default QuizPanel;
