import React, { useState, useRef } from "react";
import Countdown, { zeroPad } from "react-countdown";

import "./Quiz.css";

import ActiveQuiz from "./ActiveQuiz";
import FinalResult from "../FinalResult/FinalResult";

import { ReactComponent as StopwatchIcon } from "../../assets/stopwatch-solid.svg";

const Quiz = (props) => {
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selected, setSelected] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [timer, setTimer] = useState(Date.now() + props.timerValue * 1000);
  const [timerIndex, setTimerIndex] = useState(0);

  const countdownTimer = useRef();

  const renderer = ({ minutes, seconds }) => {
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  const selectAnswerHandler = (selectedAnswerId) => {
    if (btnDisabled) {
      return;
    }

    const isCorrect =
      props.quizData[activeQuizIndex].correctAnswerId === selectedAnswerId;

    if (isCorrect) {
      setResult(result + 1);
    }

    setSelected({
      id: selectedAnswerId,
      value: isCorrect ? "success" : "error",
    });

    setBtnDisabled(true);

    if (activeQuizIndex < props.quizData.length - 1) {
      setTimeout(() => {
        setActiveQuizIndex((prevState) => {
          return prevState + 1;
        });
        setSelected({});
        setBtnDisabled(false);

        setTimer(Date.now() + props.timerValue * 1000);
        setTimerIndex((prevState) => {
          return prevState + 1;
        });
      }, 1000);
    } else {
      setTimeout(() => {
        setIsFinished(true);
      }, 1000);
    }

    pauseTimer();
  };

  const tryAgainHandler = () => {
    setActiveQuizIndex(0);
    setSelected({});
    setIsFinished(false);
    setResult(0);
    setBtnDisabled(false);
    setTimer(Date.now() + props.timerValue * 1000);
    setTimerIndex((prevState) => {
      return prevState + 1;
    });
  };

  const countdownCompleteHandler = () => {
    if (activeQuizIndex < props.quizData.length - 1) {
      setActiveQuizIndex((prevState) => {
        return prevState + 1;
      });

      setTimer(Date.now() + props.timerValue * 1000);
      setTimerIndex((prevState) => {
        return prevState + 1;
      });
    } else {
      setIsFinished(true);
    }
  };

  const pauseTimer = () => countdownTimer.current.pause();

  return (
    <React.Fragment>
      {!isFinished && (
        <p className="quiz-timer">
          <StopwatchIcon />
          <Countdown
            date={timer}
            key={timerIndex}
            renderer={renderer}
            onComplete={countdownCompleteHandler}
            ref={countdownTimer}
          />
        </p>
      )}
      {isFinished ? (
        <FinalResult
          result={result}
          quizLength={props.quizData.length}
          onTryAgain={tryAgainHandler}
        />
      ) : (
        <ActiveQuiz
          quiz={props.quizData[activeQuizIndex]}
          activeQuizIndex={activeQuizIndex + 1}
          quizLength={props.quizData.length}
          onSelectAnswer={selectAnswerHandler}
          selected={selected}
          btnDisabled={btnDisabled}
        />
      )}
    </React.Fragment>
  );
};

export default Quiz;
