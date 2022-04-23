import Quiz from "../../components/Quiz/Quiz";

const Home = (props) => {
  return (
    <div className="quiz-wrapper">
      <Quiz quizData={props.quizData} timerValue={props.timerValue} />
    </div>
  );
};

export default Home;
