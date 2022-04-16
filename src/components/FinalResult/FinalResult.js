import "./FinalResult.css";

import Button from "../Button/Button";

const FinalResult = (props) => {
  let resultText = "";
  if (props.result === props.quizLength) {
    resultText = "Excellent result 👍👍👍";
  } else if (props.result >= props.quizLength / 2) {
    resultText = "Good result 👍";
  } else if (props.result < props.quizLength / 2) {
    resultText = "Bad result 👎";
  }

  return (
    <div className="final-result">
      <h1>Final result</h1>
      <p>
        You answered {props.result} question correct out of {props.quizLength}.
      </p>

      <p>{resultText}</p>

      <Button onClick={props.onTryAgain}>Try again</Button>
    </div>
  );
};

export default FinalResult;
