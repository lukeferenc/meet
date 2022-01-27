import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
 state = {
    numberOfEvents: '32',
    infoText: ''
  }

  
  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 50) {
      this.setState({
        errorText: 'Please enter a number between 1 and 50',
        numberOfEvents: ""
      })
    } else {
      this.setState({
        numberOfEvents: value,
        errorText: '',
      });
    }
    this.props.updateNumberOfEvents(event.target.value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          className="number-events"
          value={this.state.numberOfEvents}
          onChange={(e) => this.handleInputChanged(e)}
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;