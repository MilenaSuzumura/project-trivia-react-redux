import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };

    this.one_second = 1000;
    this.time_limit = 0;

    // console.log('Constructor');
  }

  componentDidMount() {
    // console.log('DidMount do Timer');
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, this.one_second);
  }

  componentDidUpdate(prevProps, prevState) {
    const { disabled } = this.props;
    if (prevState.seconds === this.time_limit) {
      this.setState(({
        seconds: 30,
      }), disabled);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    // console.log('Desmontou');
  }

  render() {
    // console.log('render do timer');
    const { seconds } = this.state;
    return (
      <section>
        <h2>{seconds }</h2>
      </section>
    );
  }
}

Timer.propTypes = {
  disabled: PropTypes.func,
}.isRequired;

export default Timer;
