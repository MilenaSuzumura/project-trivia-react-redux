import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Timer from './Timer';
import '../styles/Questions.css';

export default class Questions extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
    };
  }

  // avalia = () => {
  //   const { questionQnt } = this.state;
  //   const { handleShowTimer, history } = this.props;
  //   const cinco = 5;
  //   handleShowTimer();
  //   if (questionQnt === cinco) history.push('/feedback');
  // };

    buttonOptions = () => {
      this.setState({
        isClicked: true,
      });
    }

    render() {
      const { questions, allAnswers } = this.props;
      const { isClicked } = this.state;
      return (
        <div>
          <Timer />
          <h1 data-testid="question-category">
            {questions.category}
          </h1>
          <h2 data-testid="question-text">
            {questions.question}
          </h2>
          <div data-testid="answer-options">
            {allAnswers.map((answer, i) => (
              <button
                type="button"
                key={ i }
                className={ isClicked ? answer.className : null }
                data-testid={ answer.dataTest }
                onClick={ this.buttonOptions }
              >
                {answer.element}

              </button>))}
          </div>

        </div>
      );
    }
}

Questions.propTypes = {
  questions: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.object),
}.isRequired;
