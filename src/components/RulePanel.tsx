import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setGameState, storeQuizzesData } from "@/store/slice/quiz.slice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";

const RulePanel = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { getLoggedUserData, gameState } = useSelector(
		(state: RootState) => state.quizzes,
	);

	useEffect(() => {
		const fetchData = async () => {
			let response = await axios.get(
				"https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple",
			);

			dispatch(storeQuizzesData(response.data));
		};

		if (gameState == "rule") fetchData();
	}, []);

	const handleLogOut = () => {
		localStorage.removeItem("loggedUser");
		localStorage.removeItem("gameState");
		navigate("/");
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader className="flex flex-row items-center justify-between">
				<p className="text-2xl font-bold text-center">
					Welcome, {getLoggedUserData.username}!
				</p>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Quiz Rules:</h3>
					<ul className="list-disc list-inside space-y-2">
						<li>You will have 2 minutes to answer the questions.</li>
						<li>There are 15 questions in total.</li>
						<li>You can't go back to previous questions.</li>
						<li>Your final score will be shown at the end.</li>
					</ul>
				</div>
				<div className="mt-7 w-full flex justify-between">
					<Button variant={"link"} onClick={handleLogOut}>
						Log Out
					</Button>
					<Button onClick={() => dispatch(setGameState("quiz"))}>
						Proceed
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default RulePanel;
