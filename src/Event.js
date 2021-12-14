import React, { Component } from "react";

class Event extends Component {
  state = {
    collapsed: true,
  };

  handleClick = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    return (
      <div className="Event">
        <h2 className="summary">{event.summary}</h2>
        <p className="start-date">{event.start.dateTime} ({event.start.timeZone})</p>
        <br />
        <p className="location">@{event.summary} | {event.location}</p>

        {!collapsed &&
          <div className={`extra-details ${this.state.collapsed ? "hide" : "show"}`}>
            <h3>About Event</h3>
            <a href={event.htmlLink} role="noopener" target="_blank">
              See deatails on Google calendar
            </a>
            <p className="event-description">{event.description}</p>

          </div>
        }
        <button className={`${collapsed ? "show" : "hide"}-details-btn`} onClick={this.handleClick}>
          {collapsed ? "show Details" : "Hide Details"}
        </button>
      </div>
    );
  }
}

export default Event;