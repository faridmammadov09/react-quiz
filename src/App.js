// add question basanda object yarat hamisi icinde olsun
// add question basanda yeni question object yarat quiz arrayine push ele
// add quiz eleyende quiz arrayini consola cixar

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";

import Home from "./pages/Home/Home";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz";
import Profile from "./pages/Profile/Profile";
import Favorites from "./pages/Favorites/Favorites";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Settings from "./pages/Settings/Settings";

function App() {
  const [openNav, setOpenNav] = useState(false);
  const [quizData, setQuizData] = useState([
    {
      id: 1,
      question: "What is the capital of Azerbaijan?",
      answers: [
        { id: 1, text: "Baku" },
        { id: 2, text: "Ganja" },
        { id: 3, text: "Aghdam" },
        { id: 4, text: "Khankendi" },
      ],
      correctAnswerId: 1,
    },
    {
      id: 2,
      question: "Which color doesn't include in Azerbaijan's flag?",
      answers: [
        { id: 1, text: "Red" },
        { id: 2, text: "Green" },
        { id: 3, text: "Blue" },
        { id: 4, text: "Yellow" },
      ],
      correctAnswerId: 4,
    },
    {
      id: 3,
      question: "Which country doesn't have border with Azerbaijan?",
      answers: [
        { id: 1, text: "Turkey" },
        { id: 2, text: "Russia" },
        { id: 3, text: "Ukraine" },
        { id: 4, text: "Georgia" },
      ],
      correctAnswerId: 3,
    },
    {
      id: 4,
      question: "What is the currency of Azerbaijan?",
      answers: [
        { id: 1, text: "Lira" },
        { id: 2, text: "Manat" },
        { id: 3, text: "Ruble" },
        { id: 4, text: "Euro" },
      ],
      correctAnswerId: 2,
    },
    {
      id: 5,
      question:
        "What mountain range covers north and western parts of Azerbaijan?",
      answers: [
        { id: 1, text: "Altai" },
        { id: 2, text: "Alps" },
        { id: 3, text: "Himalayas" },
        { id: 4, text: "Caucasus" },
      ],
      correctAnswerId: 4,
    },
  ]);
  const [theme, setTheme] = useState("light");
  const [timerValue, setTimerValue] = useState(10);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
  }, [theme]);

  const toggleNavHandler = () => {
    setOpenNav((prevState) => {
      return !prevState;
    });
  };

  const addNewQuestionHandler = (newQuestion) => {
    setQuizData((prevState) => {
      return [...prevState, newQuestion];
    });
  };

  const addQuizHandler = () => {
    console.log(quizData);
  };

  const changeThemeHandler = () => {
    setTheme((prevState) => {
      return prevState === "light" ? "dark" : "light";
    });

    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  const changeTimerValueHandler = (e) => {
    setTimerValue(e.target.value);
  };

  return (
    <div className={theme}>
      <Header
        onToggleNav={toggleNavHandler}
        onChangeTheme={changeThemeHandler}
        theme={theme}
      />
      <Nav openNav={openNav} onToggleNav={toggleNavHandler} />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home quizData={quizData} timerValue={timerValue} />}
          ></Route>
          <Route
            path="create-quiz"
            element={
              <CreateQuiz
                onAddNewQuestion={addNewQuestionHandler}
                onAddQuiz={addQuizHandler}
              />
            }
          ></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="favorites" element={<Favorites />}></Route>
          <Route path="leaderboard" element={<Leaderboard />}></Route>
          <Route
            path="settings"
            element={
              <Settings
                onChangeTimerValue={changeTimerValueHandler}
                timerValue={timerValue}
              />
            }
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
