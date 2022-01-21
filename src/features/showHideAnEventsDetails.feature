Feature: Show/Hide an event's detailstou

Scenario: An event element is collapsed.
Given user hasn’t searched for any city or has searched for a city
When the user opens the app or selects a city
Then all the event elements should seen collapsed by the user

Scenario: User can expand an event to see its details. 
Given user is interested in an event
When user clicks on the event or a button
Then the user should see the details of the selected event

Scenario: User can collapse an event to hide its details. 
Given user got the wanted information
When user clicks on a button or outside the event element
Then the event element should collapse