import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: 'all',
    numberOfEvents: 32,
    errorText: "",
    showWelcomeScreen: undefined
  }


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


  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  render() {
    const { locations, numberOfEvents, OfflineAlertText, showWelcomeScreen} = this.state;
    if (this.state.showWelcomeScreen === undefined) return <div
    className="App" />
    return (
      <div className="App">
        <CitySearch 
          locations={/*this.state.*/locations} 
          updateEvents={this.updateEvents}/>
        <NumberOfEvents 
          numberOfEvents={numberOfEvents} 
          updateNumberOfEvents={this.updateNumberOfEvents}
          updateEventCount={this.updateEventCount} 
          errorText={this.state.errorText}/>

        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
        <EventGenre events={this.state.events} />

        <ResponsiveContainer height={400} >
          <ScatterChart
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
          >
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="city" />
          <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="number of events"
            />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
        <OfflineAlert text={OfflineAlertText} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}


export default App;