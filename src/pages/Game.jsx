import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { scoreValue } from '../redux/actions';
// import '../css/game.css';
import '../css/style.css';
import relogio from '../images/relogio.png';

class Game extends React.Component {
  state = {
    questions: [],
    answers: [],
    indexQuestion: 0,
    correctAnswer: '',
    isAnswered: false,
    timeOut: 30,
    isButtonDisabled: false,
    assert: 0,
    score: 0,
  };

  componentDidMount() {
    this.fetchQuestions();
    this.timer();
  }

  fetchQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState(
        {
          questions: data.results,
        },
        () => this.getAnswers(),
      );
    }
  };

  nextClick = () => {
    const { indexQuestion } = this.state;
    const { history } = this.props;
    const maxLength = 4;
    if (indexQuestion < maxLength) {
      this.setState(
        (prevState) => ({
          ...prevState,
          indexQuestion: prevState.indexQuestion + 1,
          isAnswered: false,
          isButtonDisabled: false,
          timeOut: 30,
        }),
        () => this.getAnswers(), this.timer(),
      );
    }
    if (indexQuestion === maxLength) {
      // setScore(score, assert);
      history.push('feedback');
    }
  };

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  getAnswers = () => {
    const { questions, indexQuestion } = this.state;
    this.setState({
      correctAnswer: questions[indexQuestion].correct_answer,
    });
    if (questions.length > 0) {
      const response = [
        questions[indexQuestion].correct_answer,
        ...questions[indexQuestion].incorrect_answers,
      ];
      console.log('RESPOSTAS', response);
      const shuffledAnswer = this.shuffleArray(response);
      this.setState({
        answers: shuffledAnswer,
      });
    }
  };

  giveAnswer = (e) => {
    const { isAnswered, indexQuestion,
      correctAnswer, questions, timeOut } = this.state;
    const ten = 10;
    const three = 3;
    if (!isAnswered) {
      this.setState({
        isAnswered: true,
        isButtonDisabled: true,
      });
    }
    console.log(questions[indexQuestion].difficulty);

    if (e.target.innerHTML === correctAnswer) {
      if (questions[indexQuestion].difficulty === 'easy') {
        this.setState((prevState) => ({
          score: prevState.score + (ten + timeOut),
          assert: prevState.assert + 1,
        }), this.updateScore);
      }
      if (questions[indexQuestion].difficulty === 'medium') {
        this.setState((prevState) => ({
          score: prevState.score + (ten + (timeOut * 2)),
          assert: prevState.assert + 1,
        }), this.updateScore);
      }
      if (questions[indexQuestion].difficulty === 'hard') {
        this.setState((prevState) => ({
          score: prevState.score + (ten + (timeOut * three)),
          assert: prevState.assert + 1,
        }), this.updateScore);
      }
    }
    // if (indexQuestion === maxNum) {
    //   setScore(score, right);
    //   history.push('feedback');
    // }
    clearTimeout();
  };

  updateScore = () => {
    const { score, assert } = this.state;
    const { setScore } = this.props;
    setScore(score, assert);
  };

  timer = () => {
    const ms = 1000;
    const time = setInterval(() => {
      console.log('rodando');
      const { timeOut } = this.state;
      if (timeOut > 0) {
        this.setState((prevState) => ({
          timeOut: prevState.timeOut - 1,
        }));
      } else {
        clearTimeout(time);
        this.setState({
          isButtonDisabled: true,
        });
      }
    }, ms);
  };

  render() {
    const { questions, indexQuestion,
      answers, correctAnswer, isAnswered, timeOut, isButtonDisabled } = this.state;
    return (
      <div className="container-global-game">
        <Header />
        <div className="container-trivia-timer">
          {questions.length > 0 && (
            <div className="container-questions">
              <p data-testid="question-category" className="category">
                {questions[indexQuestion].category}
              </p>
              <h3 data-testid="question-text" className="questions-trivia">
                {questions[indexQuestion].question}
              </h3>

              <div data-testid="answer-options" className="answers">
                {answers.length > 0
                  && answers.map((answer, i) => {
                    if (answer === correctAnswer) {
                      return (
                        <button
                          type="button"
                          data-testid="correct-answer"
                          key={ i }
                          onClick={ this.giveAnswer }
                          className={ isAnswered || timeOut === 0 ? 'correct' : null }
                          disabled={ isButtonDisabled }
                        >
                          {answer}
                        </button>
                      );
                    }

                    return (
                      <button
                        type="button"
                        data-testid="wrong-answer"
                        key={ i }
                        onClick={ this.giveAnswer }
                        className={ isAnswered || timeOut === 0 ? 'wrong' : null }
                        disabled={ isButtonDisabled }
                      >
                        {answer}
                      </button>
                    );
                  })}
              </div>
              <br />
              {isAnswered || timeOut === 0 ? (
                <button
                  data-testid="btn-next"
                  type="button"
                  onClick={ this.nextClick }
                  className="btn-next"
                >
                  Next
                </button>
              ) : null}
            </div>
          )}
          <div className="container-timer">
            <h3 className="timer-number">{timeOut}</h3>
            <img src={ relogio } alt="relogio" className="img-relogio" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
Game.propTypes = {
  history: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setScore: (score, assertion) => dispatch(scoreValue(score, assertion)),
});

export default connect(null, mapDispatchToProps)(Game);
