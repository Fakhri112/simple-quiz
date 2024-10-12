import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, SetUsername] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("loggedUser")) return navigate("/quiz");
	}, []);

	const handleLogin = () => {
		const loggedUser = {
			currentGameState: "rule",
			username,
			endQuizEpochTime: 0,
			quizzes: [],
			answer: [],
		};
		localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
		navigate("/quiz");
	};

	return (
		<div className="h-screen grid place-items-center bg-purple-600">
			<Card className="w-full max-w-md mx-auto">
				<CardHeader>
					<p className="text-2xl font-bold text-center">Quiz App</p>
					<small className="text-center">
						(This is fake login. Type anything you want)
					</small>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="login-username" className="">
								Username
							</Label>
							<Input
								placeholder="Username"
								value={username}
								onChange={(e) => SetUsername(e.target.value)}
								id="login-username"
								name="username"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="login-password">Password</Label>
							<Input
								placeholder="Password"
								id="login-password"
								name="password"
								type="password"
								required
							/>
						</div>
						<Button
							onClick={handleLogin}
							variant={"default"}
							className="w-full text-xl">
							Login
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
