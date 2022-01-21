Feature: Specify number of events

Scenario: When user hasn’t specified a number, 32 is the default number.
Given user opened the app or selected a city
When the user does not specify the number of shown events
Then a list of 32 events should return to the user

Scenario: User can change the number of events they want to see. 
Given user opened the app or selected a city
When the user does specify the number of shown events
Then a list of events with the specified number should be returned to the user