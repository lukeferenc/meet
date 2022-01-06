import React, { Component } from "react";

class NumberOfEvents extends Component {

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