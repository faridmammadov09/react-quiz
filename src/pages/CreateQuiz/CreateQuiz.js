import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/UI/Input/Input";

import { useNavigate } from "react-router-dom";

import "./CreateQuiz.css";

const CreateQuiz = (props) => {
  const [formInput, setFormInput] = useState({
    question: {
      label: "Question",
    },
    option1: { label: "Answer 1", id: 1 },
    option2: { label: "Answer 2", id: 2 },
    option3: { label: "Answer 3", id: 3 },
    option4: { label: "Answer 4", id: 4 },
    rightAnswer: { label: "Right answer id" },
  });

  let navigate = useNavigate();

  const submitFormHandler = (e) => {
    e.preventDefault();

    for (let key in formInput) {
      if (formInput[key].value === undefined) {
        alert("Fill in all blanks");
        return;
      }
    }

    const newQuestion = {
      id: Math.random().toString(),
      question: formInput.question.value,
      answers: [
        { id: 1, text: formInput.option1.value },
        { id: 2, text: formInput.option2.value },
        { id: 3, text: formInput.option3.value },
        { id: 4, text: formInput.option4.value },
      ],
      correctAnswerId: +formInput.rightAnswer.value,
    };

    props.onAddNewQuestion(newQuestion);
    navigate("/");
  };

  const changeInputHandler = (input, value) => {
    // console.log(input, value);

    const formInputCopy = { ...formInput };
    formInputCopy[input].value = value;
    setFormInput(formInputCopy);
  };

  return (
    <form onSubmit={submitFormHandler} className="form-create">
      {Object.keys(formInput).map((key, index) => {
        return (
          <Input
            label={formInput[key].label}
            key={index}
            onChange={(e) => changeInputHandler(key, e.target.value)}
          />
        );
      })}

      <div className="form-create__footer">
        <Button className="button--sm" type="submit">
          Add question
        </Button>
        <Button className="button--sm" onClick={props.onAddQuiz}>
          Add quiz
        </Button>
      </div>
    </form>
  );
};

export default CreateQuiz;
