import "./ActiveQuiz.css";

import AnswerList from "../Answer/AnswerList";

const ActiveQuiz = (props) => {
  return (
    <div className="quiz">
      <div className="quiz-counter">
        Question {props.activeQuizIndex} of {props.quizLength}
      </div>
      <div className="question">{props.quiz.question}</div>
      <AnswerList
        answers={props.quiz.answers}
        onSelectAnswer={props.onSelectAnswer}
        selected={props.selected}
        btnDisabled={props.btnDisabled}
      />
    </div>
  );
};

export default ActiveQuiz;
