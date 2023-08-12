// eslint-disable-next-line
import React, { Component } from 'react';
import Timer from './timer'; 

class InfiniteTimer extends React.Component {
    state = {
      time: 1000 * 1000, // ms, = 1000s
    };
  
    onTimeEnd = () => this.setState({ time: 1000 * 1000 });
  
    onTimeChange = (time) => this.setState({ time });
  
    onTimeStart = (timeLeft) =>
      console.log("Таймер запущено! Залишилось часу: " + (timeLeft / 1000).toFixed(1));
  
    onTimePause = (timeLeft) => {
    console.log("Таймер на паузі! Залишилось часу: " + (timeLeft / 1000).toFixed(1));
  }
  
    render() {
      return (
        <Timer
          time={this.state.time}
          onTimeChange={this.onTimeChange}
          onTimeEnd={this.onTimeEnd}
          onTimeStart={this.onTimeStart}
          onTimePause={this.onTimePause}
          step={10000}
          autostart
        />
      );
    }
  }
  
  export default InfiniteTimer;