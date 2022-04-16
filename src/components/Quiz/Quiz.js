import React from "react";

import ActiveQuiz from "./ActiveQuiz";
import FinalResult from "../FinalResult/FinalResult";

class Quiz extends React.Component {
  state = {
    quizData: [
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
    ],
    activeQuizIndex: 0,
    selected: {},
    isFinished: false,
    result: 0,
    btnDisabled: false,
  };
  selectAnswerHandler = (selectedAnswerId) => {
    if (this.state.btnDisabled) {
      return;
    }

    const isCorrect =
      this.state.quizData[this.state.activeQuizIndex].correctAnswerId ===
      selectedAnswerId;

    if (isCorrect) {
      this.setState({
        result: this.state.result + 1,
      });
    }

    this.setState({
      selected: {
        id: selectedAnswerId,
        value: isCorrect ? "success" : "error",
      },
      btnDisabled: true,
    });

    if (this.state.activeQuizIndex < this.state.quizData.length - 1) {
      setTimeout(() => {
        this.setState({
          activeQuizIndex: this.state.activeQuizIndex + 1,
          selected: {},
          btnDisabled: false,
        });
      }, 1000);
    } else {
      setTimeout(() => {
        this.setState({
          isFinished: true,
        });
      }, 1000);
    }
  };
  tryAgainHandler = () => {
    this.setState({
      activeQuizIndex: 0,
      selected: {},
      isFinished: false,
      result: 0,
      btnDisabled: false,
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.isFinished ? (
          <FinalResult
            result={this.state.result}
            quizLength={this.state.quizData.length}
            onTryAgain={this.tryAgainHandler}
          />
        ) : (
          <ActiveQuiz
            quiz={this.state.quizData[this.state.activeQuizIndex]}
            activeQuizIndex={this.state.activeQuizIndex + 1}
            quizLength={this.state.quizData.length}
            onSelectAnswer={this.selectAnswerHandler}
            selected={this.state.selected}
            btnDisabled={this.state.btnDisabled}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Quiz;
