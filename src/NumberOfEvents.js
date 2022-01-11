import React, { Component } from "react";

class NumberOfEvents extends Component {
 state = {
    numberOfEvents: '32',
  }

  updateEventNumber = (event) => {
    const value = event.target.value;
    console.log(value, "value")
    this.setState({
      numberOfEvents: value,
    });
  this.props.updateNumberOfEvents(value)
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="text"
          className="number-events"
          value={this.state.numberOfEvents}
          onChange={this.updateEventNumber}
        />
      </div>
    );
  }
}

export default NumberOfEvents;