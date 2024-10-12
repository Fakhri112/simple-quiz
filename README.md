# **Simple Quiz App**

This is a simple quiz application that fetches 15 multiple-choice questions from the [Open Trivia Database (opentdb.com)](https://opentdb.com/) API. The quiz is based on general knowledge and has a 2-minute time limit to complete.

## **Table of Contents**

- [About the Project](#about-the-project)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contact](#contact)

## **About the Project**

The quiz is designed to challenge users with general knowledge questions. The quiz consists of 15 multiple-choice questions fetched from the Open Trivia Database API. A 2-minute timer is in place, and users can resume the quiz if they leave or refresh the page, thanks to the use of localStorage.

## **Features**

- Fake login to proceed to quiz page (Not linked to backend)
- 15 multiple-choice questions from the general knowledge category.
- 2-minute timer to complete the quiz.
- Resuming quiz mechanism using localStorage.
- User-friendly interface with Shadcn/UI and TailwindCSS.

## **Installation**

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/username/simple-quiz-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd simple-quiz-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

## **Usage**

Once the app is running, you can start the quiz by navigating to the quiz page. You have 2 minutes to answer all the questions. If you leave or refresh the page, the quiz will automatically save your progress, allowing you to resume from where you left off.

## **Technologies Used**

- **React**: For building the user interface.
- **Redux**: For state management.
- **Shadcn/UI**: For building components and enhancing the user experience.
- **TailwindCSS**: For styling with utility classes.
- **Vite**: For fast and efficient development.

## **Contact**

Created by [Fakhri112](https://github.com/Fakhri112). Feel free to reach out if you have any questions or suggestions!
