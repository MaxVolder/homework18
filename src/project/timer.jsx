import React from 'react';
import * as ReactCircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './timerstyles.css';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    const { time, autostart, step } = props;

    this.state = {
      timeLeft: Number(time),
      step: Number(step),
      autostart: autostart,
    };
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.tick = this.tick.bind(this);
  }

  tick() {
    if (this.state.timeLeft === 0) {
      clearInterval(this.Interval);
      return;
    }
    this.setState({
      timeLeft: this.state.timeLeft - this.state.step,
    });
  }
  componentDidMount() {
    if (this.state.autostart) {
      this.startTimer();
    }
  }

  startTimer() {
    this.Interval = setInterval(() => {
      this.tick();
    }, this.state.step);
  }
  pauseTimer() {
    clearInterval(this.Interval);
  }
  componentWillUnmount() {
    clearInterval(this.Interval);
  }

  render() {
    const circleSize = 200; // Set the desired size of the circle

    return (
      <div className="timer-container">
        <div className="timer-circle">
          <ReactCircularProgressbar.CircularProgressbar
            value={(this.state.timeLeft / Number(this.props.time)) * 100}
            text={`${Math.floor(this.state.timeLeft / 1000)}s`}
            styles={{
              root: { width: circleSize, height: circleSize },
              path: { stroke: '#FF4500' },
              text: { fill: '#FFF', fontSize: '30px' },
            }}
          />
        </div>
        <div className="buttons">
          <button onClick={this.startTimer}>START</button>
          <button onClick={this.pauseTimer}>PAUSE</button>
        </div>
      </div>
    );
  }
}

export default Timer;
