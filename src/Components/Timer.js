import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 10,
      phases: ['Pergunta 1', 'Pergunta 2', 'Pergunta 3'],
      phaseIndex: 0,
    };

    this.one_second = 1000;
    this.time_limit = 0;

    console.log('Constructor');
  }

  componentDidMount() {
    console.log('DidMount do Timer');
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, this.one_second);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.seconds === this.time_limit) {
      this.setState({
        seconds: 10,
        phaseIndex: prevState.phaseIndex === 2 ? 0 : prevState.phaseIndex + 1,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    console.log('Desmontou');
  }

  render() {
    console.log('render do timer');
    const { seconds, phases, phaseIndex } = this.state;
    return (
      <section>
        <h1>{phases[phaseIndex]}</h1>
        <h2>{seconds }</h2>
      </section>
    );
  }
}
export default Timer;
