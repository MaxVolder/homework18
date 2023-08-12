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
      isPaused: !autostart,
    };

    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this); 
    this.tick = this.tick.bind(this);
  }

  tick() {
    if (this.state.timeLeft === 0 || this.state.isPaused) {
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
    if (!this.state.isPaused) {
      this.Interval = setInterval(() => {
        this.tick();
        if (this.state.timeLeft === this.props.time) {
          this.props.onTimeStart(this.state.timeLeft);
        }
      }, this.state.step);
    }
    this.setState({
      isPaused: false,
    });
    this.props.onTimeStart(this.state.timeLeft); 
  }
  

  pauseTimer() {
    clearInterval(this.Interval);
    this.setState({
      isPaused: true,
    });
    this.props.onTimePause(this.state.timeLeft);
  }

  resumeTimer() {
    this.startTimer(); 
    this.setState({
      isPaused: false,
    });
  }

  componentWillUnmount() {
    clearInterval(this.Interval);
  }

  render() {
    const circleSize = 200;

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
          {this.state.isPaused ? (
            <button onClick={this.resumeTimer}>RESUME</button> 
          ) : (
            <button onClick={this.pauseTimer}>PAUSE</button>
          )}
          <button onClick={this.startTimer}>START</button>
        </div>
      </div>
    );
  }
}

export default Timer;
