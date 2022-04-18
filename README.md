Meet App
Description

Meet App is a meet-up application I built as a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

Availabale on GitHub Pages: https://lukeferenc.github.io/meet/

Tools

    React
    OAuth2
    AWS Lambda
    Google Calendar API

Dependencies

    axios
    bootstrap
    nprogress
    react
    react-bootstrap
    react-dom
    react-scripts
    web-vitals


User Stories
Feature 1: Filter events by city

As a user, I should be able to "filter events by city" so that I can see the list of events that take place in the city.

Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.

    Given: the user has not searched for a city,
    When: the user opens the app,
    Then: the user should see all upcoming events from all cities.

Scenario 2: User should see a list of suggestions when they search for a city.

    Given: the user wants to see all upcoming events in a city,
    When: the user types the specific city in the search bar,
    Then: the user should see a list of suggestions for a city.

Scenario 3: User can select a city from the suggested list.

    Given: the user types the city name in an input field for city,
    When: the list of suggestions appears,
    Then: the user can select the city from the suggested list.

Feature 2: Show/hide an event’s details.

As a user, I should be able to show or hide an event’s details so that I can choose to view further details of an event.
Scenario 1: An event element is collapsed by default.

    Given: the user is on main page,
    When: the event element is collapsed by default,
    Then: the user should not see event elements.

Scenario 2: User can expand an event to see its details.

    Given: the user wants to see the details of an event,
    When: the user clicks on the desired event,
    Then: the user expands an event and see its details.

Scenario 3: User can collapse an event to hide its details.

    Given: the user with an expanded event,
    When: the user clicks on the expanded event,
    Then: the user collapses the event element and hide its details.

Feature 3: Specify number of events

As a user, I should be able to specify number of events so that I can choose how many events I want to know in a specific area.
Scenario 1: When user hasn’t specified a number, 32 is the default number.

    Given: the user opens the app,
    When: the user has not specified a number in “Number of Events” element,
    Then: 32 is set as default number.

Scenario 2: User can change the number of events they want to see.

    Given: the user wants to change the number of events they want to see,
    When: the user types the number in “Number of Events” element,
    Then: the specified number will be used as the number of events to show.

Feature 4: Use the app when offline

As a user, I should be able to use the app when offline so that I can still see the events when there is no internet connection.
Scenario 1: Show cached data when there’s no internet connection.

    Given: internet connection is limited to none,
    When: a user interacts with the app,
    Then: the user can see the last viewed events from cached data.

Scenario 2: Show error when user changes the settings (city, time range).

    Given: a user opens the app with no internet connection,
    When: a user wants to change the settings,
    Then: app shows error.

Feature 5: Data visualization

As a user, I should be able to see the visualization of upcoming events in each city so that I can see the trend in each city.
Scenario 1: Show a chart with the number of upcoming events in each city.

    Given: a user wants to see the number of upcoming events in each city,
    When: the user clicks on the chart,
    Then: the user can see the event trends in each city.
