import Loading from "@/components/Loading";
import QuizPanel from "@/components/QuizPanel";
import ReportPanel from "@/components/ReportPanel";
import RulePanel from "@/components/RulePanel";
import { getLocalStorageData, setGameState } from "@/store/slice/quiz.slice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
	const { getLoggedUserData, gameState } = useSelector(
		(state: RootState) => state.quizzes,
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!localStorage.getItem("loggedUser")) return navigate("/");
		dispatch(getLocalStorageData());
	}, []);

	useEffect(() => {
		const { currentGameState } = getLoggedUserData;
		setTimeout(() => {
			if (currentGameState == "report") dispatch(setGameState("report"));
			else if (currentGameState == "quiz") dispatch(setGameState("quiz"));
			else if (currentGameState == "rule") dispatch(setGameState("rule"));
		}, 1000);
	}, [getLoggedUserData.currentGameState]); //Debug disini

	return (
		<div className="bg-purple-800 h-screen grid place-items-center">
			<div>
				{gameState == "quiz" && <QuizPanel />}
				{gameState == "rule" && <RulePanel />}
				{gameState == "report" && <ReportPanel />}
				{gameState == "" && <Loading />}
			</div>
		</div>
	);
};

export default Quiz;
