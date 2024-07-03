# Flexera Test

## Introduction

This application was developed as a technical test for Flexera.
The goal was to build a web application using React and TypeScript that fetches and displays GitHub repositories, allows users to flag repositories for visibility, and supports pagination.

- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Features](#features)
- [Runbook](#runbook)
- [Future Improvements](#future-improvements)

## Installation

To get started with the project, clone the repository and install the dependencies:

```sh
unzip flexera-test.zip
cd flexera-test
npm install
```



## Features

- **Fetch and Display Repositories**: The application fetches repositories from the GitHub API and displays them with pagination.
- **Persistent Flag Status Tracking**: Users can set a visible flag on each repository, which is persisted across page reloads. I'm using localstorage which is extreamly effcient for tasks like this.
- **Basic Error handling**: If the feed fails an error message is displayed. There needs to be some feedback to the user when the feed isn't successful.
- **Pagination**: Users can paginate through the results, with options to change the number of items per page between 10 and 30. I'm aware the requirement is 10 results however I wanted to demonstrate my capabilities by adding this extra option. The user can also go to the end of the records however the absolute limit is 1000 otherwise, using the record count will ensure an error. I also added a loading label so that the user knows something is happening. There's room to replace this with a spinner.
- **Navigation**: Pagination includes options to go to the first, last, previous, and next pages.
- **Additional Fonts**: Used a font similar to Flexera to improve the look and feel. Just a small touch to try and improve the UI look and feel.
- **Enhanced User Interface**: The user interface is designed purely in css. I wanted to soften look of the elements so opted for light greys, drop shadows and rounded corners with primary colours for the CTA's.
- **Unit Testing**: Various libraries to ensure full coverage of the components.
- **End-to-End Testing**: Cypress is set up for end-to-end testing.
- **404 page**: Something basic to handle bad routes.
- **Styled Theme**: I've applied variables in one theme file to keep values standard.
- **Responsive Design**: A very minor point on the pagination, below 680px it hides the dropdown and label to mainain visual consistency.

## Runbook

### Running the Development Server

`npm run dev`

### Running Unit Tests

`npm test`

### Running Cypress Tests

`npm run cy:run`

### Building for Production

`npm run build`

### Starting the Production Server

`npm run start`

## Future Improvements

If I had more time...

- **Search Functionality**: Implementing a search bar to filter repositories based on user input.
- **Sorting Options**: Adding sorting options to sort repositories by different criteria such as stars, forks, etc.
- **Consider Lazy Loading**: Find out from UX if this is a preferred option.
- **Added Header and Footer**: I did consider this might be over-kill but was thought about.
- **Introduce sonarQube**: To ensure contuned cond coverage and reduced cognitive complexity.
- **Integrating more icons**: Ideally these should be included with the pagination arrows, I did start this but ran into some issues to do with the layout looking quite random.  Thinking this through these could be made into icon buttons.  
