import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
// import { mockData } from './mock-data';

class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  render() {
    const { numberOfEvents } = this.state;
    return (
      <div className="App">
         <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents}/>
        <NumberOfEvents 
          numberOfEvents={numberOfEvents} 
          updateEventCount={this.updateEventCount} 
          errorText={this.state.errorText}/>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;