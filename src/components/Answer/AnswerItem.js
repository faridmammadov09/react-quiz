import "./AnswerItem.css";

const AnswerItem = (props) => {
  const selectAnswerHandler = () => {
    props.onSelectAnswer(props.answer.id);
  };

  return (
    <li
      onClick={selectAnswerHandler}
      className={`answer-item ${
        props.answer.id === props.selected.id ? props.selected.value : ""
      }`}
      disabled={props.btnDisabled}
    >
      {props.children}
    </li>
  );
};

export default AnswerItem;
