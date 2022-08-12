import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { fetchSecondAPI } from '../redux/actions';
import Questions from '../Components/Questions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      stateOption: [],
      stateQuestion: [],
      indexQuestion: 0,
    };
  }

  componentDidMount = () => {
    this.RandonAllAnswers();
    this.handleDisabled();
  }

  handleDisabled = () => {
    this.setState((prevState) => ({
      disabled: !prevState.disabled,
    }));
  }

  increaseIndex = () => {
    const { indexQuestion } = this.state;
    const { history } = this.props;
    const quatro = 4;
    if (indexQuestion < quatro) {
      this.setState({
        indexQuestion: indexQuestion + 1,
      });
    } else {
      this.setState({
        indexQuestion: 0,
      });
      history.push('/feedback');
    }
  }

  RandonAllAnswers = async () => {
    const storage = localStorage.getItem('token');
    const { questionsGenerator, history } = this.props;
    const API = await questionsGenerator(storage);
    const three = 3;
    if (API.response_code === three) {
      localStorage.removeItem('token');
      return history.push('/');
    }
    const optionArray = [];
    const questionsArray = [];
    const difficultyLevel = [];

    API.results.forEach((element) => {
      const auxArray = [{
        element: element.correct_answer,
        dataTest: 'correct-answer',
        className: 'correctAnswer',
      }];
      element.incorrect_answers.forEach((incorrect, index) => {
        auxArray.push({
          element: incorrect,
          dataTest: `wrong-answer-${index}`,
          className: 'incorrectAnswer',
        });
      });
      optionArray.push(auxArray.sort(
        () => Math.random() - Number('0.5'),
      ));
      questionsArray.push({
        question: element.question,
        category: element.category,
      });
      difficultyLevel.push(element.difficulty);
      this.setState({
        stateOption: optionArray,
        stateQuestion: questionsArray,
        stateDifficulty: difficultyLevel,
      });
    });
  }

  render() {
    const {
      stateQuestion,
      stateDifficulty,
      stateOption,
      indexQuestion,
    } = this.state;
    if (stateOption.length === 0) {
      return (<h1>...carregando</h1>);
    }
    return (
      <div>
        <Header />
        <Questions
          questions={ stateQuestion[indexQuestion] }
          difficultyLevel={ stateDifficulty[indexQuestion] }
          allAnswers={ stateOption[indexQuestion] }
          increaseIndex={ this.increaseIndex }
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questionsGenerator: (token) => dispatch(fetchSecondAPI(token)),
});

Game.propTypes = {
  questionsGenerator: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Game);
