import React, { Component } from 'react';
import Header from '../Components/Header';
import Timer from '../Components/Timer';
import Feedback from './Feedback';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimer: false,
    };
  }

  handleShowTimer = () => {
    this.setState((prevState) => ({
      showTimer: !prevState.showTimer,
    }));
  }

  render() {
    const { showTimer } = this.state;
    return (
      <div>
        <Header />
        <Feedback />
        <h1>Game</h1>
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
