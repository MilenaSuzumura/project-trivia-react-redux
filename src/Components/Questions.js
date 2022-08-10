import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Questions extends Component {
  constructor() {
    super();
    this.state = {
      buttonNext: false,
      questionQnt: 0,
    };
  }

  questionAnswers = () => {
    this.setState({
      buttonNext: true,
    });
  };

  avalia = () => {
    const { questionQnt } = this.state;
    const { handleShowTimer, history } = this.props;
    const cinco = 5;
    handleShowTimer();
    if (questionQnt === cinco) history.push('/feedback');
  };

  render() {
    const { questions, index, allAnswers, handleShowTimer,
      disabled } = this.props;
    const { question,
      category,
      correct_answer: correctAnswer } = questions[index];
    const { buttonNext } = this.state;
    return (
      <div>
        <div>
          <h1 data-testid="question-category">
            {category}
          </h1>
          <h2 data-testid="question-text">
            {question}
          </h2>
          <div data-testid="answer-options">
            {allAnswers.map((answer, i) => {
              if (correctAnswer === answer) {
                return (
                  <button
                    type="button"
                    data-testid="correct-answer"
                    onClick={ this.questionAnswers }
                    value={ correctAnswer }
                    disabled={ disabled }
                    key={ i }
                  >
                    {correctAnswer}
                  </button>);
              }
              return (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  onClick={ this.questionAnswers }
                  value={ answer }
                  disabled={ disabled }
                  key={ i }
                >
                  {answer}
                </button>
              );
            })}
            {
              buttonNext && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ () => {
                    handleShowTimer();
                    this.setState((prevState) => ({
                      questionQnt: prevState.questionQnt + 1,
                      buttonNext: false,
                    }), this.avalia);
                  } }
                >
                  Next
                </button>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.func,
  index: PropTypes.number,
  history: PropTypes.objectOf(PropTypes.object),
}.isRequired;
