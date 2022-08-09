import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Timer from '../Components/Timer';
import Feedback from './Feedback';
import { fetchSecondAPI } from '../redux/actions';
import Questions from '../Components/Questions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questionsList: [],
      indexQuestion: 0,
      showTimer: false,

    };
  }

  componentDidMount() {
    this.handleFetchAPI();
  }

  handleFetchAPI = async () => {
    const { questionsGenerator, history } = this.props;
    const three = 3;
    const storage = localStorage.getItem('token');
    const API = await questionsGenerator(storage);
    if (API.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      questionsList: API.results,
    });
  };

  handleShowTimer = () => {
    this.setState((prevState) => ({
      showTimer: !prevState.showTimer,
    }));
  }

  render() {
    const { showTimer, questionsList, indexQuestion } = this.state;
    const allAnswers = questionsList.length > 0
    && [...questionsList[indexQuestion].incorrect_answers,
      questionsList[indexQuestion].correct_answer].sort(
      () => Math.random() - Number('0.5'),
    );
    return (
      <div>
        <Header />
        <Feedback />
        { questionsList.length > 0
        && <Questions
          questions={ questionsList }
          index={ indexQuestion }
          allAnswers={ allAnswers }
        />}
        {showTimer && <Timer /> }

        <button
          type="button"
          onClick={ this.handleShowTimer }
        >
          { showTimer ? 'Esconder Timer' : 'Mostrar Timer'}
        </button>
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
