import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scoreCount, assertionCount } from '../redux/actions/index';
import '../CSS/Questions.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      disabled: false,
      seconds: 30,
    };

    this.one_second = 1000;
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, this.one_second);
  }

  componentDidUpdate() {
    this.NomeGenerico();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleClick = (event) => {
    this.buttonOptions();
    this.handleScore(event);
  }

  handleScore = () => {
    const { difficultyLevel, newScore, newAcertos } = this.props;
    const { seconds } = this.state;
    const hardLevel = 3;
    const mediumLevel = 2;
    const easyLevel = 1;
    const dez = 10;
    let difficulty = 0;
    if (difficultyLevel === 'hard') difficulty = hardLevel;
    if (difficultyLevel === 'medium') difficulty = mediumLevel;
    if (difficultyLevel === 'easy') difficulty = easyLevel;
    const mult = seconds * difficulty;
    const count = dez + mult;
    newScore(count);
    const acertos = 1;
    newAcertos(acertos);
    console.log(difficultyLevel, seconds, count);
  }

  NomeGenerico = () => {
    const { seconds } = this.state;
    const timeLimit = 0;
    if (seconds === timeLimit) {
      this.setState(({
        seconds: 30,
        disabled: true,
      }));
    }
  }

  handleTime = () => {
    this.setState((prevState) => ({
      disabled: !prevState.disabled }));
  };

    buttonOptions = () => {
      this.setState({
        isClicked: true,
        disabled: true,
      });
      this.NomeGenerico();
    }

    render() {
      const { questions, allAnswers, increaseIndex } = this.props;
      const { isClicked, disabled, seconds } = this.state;
      return (
        <div className="questions-container">
          { seconds }
          <h1 data-testid="question-category">
            {questions.category}
          </h1>
          <h2 data-testid="question-text">
            {questions.question}
          </h2>
          <div data-testid="answer-options">
            {allAnswers.map((answer, i) => {
              if (answer.dataTest === 'correct-answer') {
                return (
                  <button
                    type="button"
                    key={ i }
                    className={ isClicked ? answer.className : null }
                    data-testid={ answer.dataTest }
                    onClick={ this.handleClick }
                    disabled={ disabled }
                  >
                    {answer.element}

                  </button>
                );
              }
              return (
                <button
                  type="button"
                  key={ i }
                  className={ isClicked ? answer.className : null }
                  data-testid={ answer.dataTest }
                  onClick={ this.buttonOptions }
                  disabled={ disabled }
                >
                  {answer.element}
                </button>);
            })}
            {
              isClicked && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ () => {
                    this.setState({
                      isClicked: false,
                      disabled: false,
                    });
                    increaseIndex();
                  } }
                >
                  Next
                </button>
              )
            }
          </div>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  newScore: (score) => dispatch(scoreCount(score)),
  newAcertos: (assertion) => dispatch(assertionCount(assertion)),
});

Questions.propTypes = {
  questions: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.object),
  secondsCount: PropTypes.func,
  newAcertos: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Questions);
