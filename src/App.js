import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
    errorText: "",
    showWelcomeScreen: undefined
  }

  updateNumberOfEvents = (value) => {
    this.updateEvents(this.state.currentLocation, value)
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? events : events.filter((event) => event.location === location);
      const shownEvents = locationEvents.slice(0, eventCount);
      this.setState({
        events: shownEvents,
        currentLocation: location
      });
    });
  }

  updateEventCount = async (e) => {
    const newNumber = e.target.value ? parseInt(e.target.value) : 32;

    if (newNumber < 1 || newNumber > 32) {
      await this.setState({
        errorText: "Select number between 1 and 32",
      });
    } else {
      await this.setState({
        errorText: "",
        numberOfEvents: newNumber,
      });
      this.updateEvents(this.state.currentLocation, this.state.numberOfEvents);
    }
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false: true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
      if (!navigator.onLine) {
        this.setState({
          OfflineAlertText: 'You are not connected to the internet'
        });
      } else {
        this.setState({
          OfflineAlertText: ''
        });
      }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const { numberOfEvents, OfflineAlertText,  } = this.state;
    return (
      <div className="App">
        <CitySearch 
          locations={this.state.locations} 
          updateEvents={this.updateEvents}/>
        <NumberOfEvents 
          numberOfEvents={numberOfEvents} 
          updateNumberOfEvents={this.updateNumberOfEvents}
          updateEventCount={this.updateEventCount} 
          errorText={this.state.errorText}/>
        <EventList events={this.state.events} />
        <OfflineAlert text={OfflineAlertText} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}


export default App;