import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Questions extends Component {
  render() {
    console.log('Renderizei');
    const { questions, index, allAnswers } = this.props;
    const { question,
      category,
      correct_answer: correctAnswer } = questions[index];
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
                  <button type="button" data-testid="correct-answer" key={ i }>
                    {correctAnswer}
                  </button>);
              }
              return (
                <button
                  type="button"
                  data-testid={ `wrong-answer-${i}` }
                  key={ i }
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.func,
  index: PropTypes.number,
}.isRequired;
