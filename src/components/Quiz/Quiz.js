import React, { useState } from "react";

import ActiveQuiz from "./ActiveQuiz";
import FinalResult from "../FinalResult/FinalResult";

const Quiz = () => {
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
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const selectAnswerHandler = (selectedAnswerId) => {
    if (btnDisabled) {
      return;
    }

    const isCorrect =
      quizData[activeQuizIndex].correctAnswerId === selectedAnswerId;

    if (isCorrect) {
      setResult(result + 1);
    }

    setSelected({
      id: selectedAnswerId,
      value: isCorrect ? "success" : "error",
    });

    setBtnDisabled(true);

    if (activeQuizIndex < quizData.length - 1) {
      setTimeout(() => {
        setActiveQuizIndex(activeQuizIndex + 1);
        setSelected({});
        setBtnDisabled(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsFinished(true);
      }, 1000);
    }
  };

  const tryAgainHandler = () => {
    setActiveQuizIndex(0);
    setSelected({});
    setIsFinished(false);
    setResult(0);
    setBtnDisabled(false);
  };

  return (
    <React.Fragment>
      {isFinished ? (
        <FinalResult
          result={result}
          quizLength={quizData.length}
          onTryAgain={tryAgainHandler}
        />
      ) : (
        <ActiveQuiz
          quiz={quizData[activeQuizIndex]}
          activeQuizIndex={activeQuizIndex + 1}
          quizLength={quizData.length}
          onSelectAnswer={selectAnswerHandler}
          selected={selected}
          btnDisabled={btnDisabled}
        />
      )}
    </React.Fragment>
  );
};

export default Quiz;
