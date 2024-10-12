function secondsToFormattedString(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	const formattedMinutes = minutes > 0 ? `${minutes}m ` : "";
	const formattedSeconds = remainingSeconds > 0 ? `${remainingSeconds}s` : "";

	return formattedMinutes + formattedSeconds;
}

export { secondsToFormattedString };
