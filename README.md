# Trips Management System

## Overview

The **Trips Management System** is a React-based web application designed to manage and display trip details. It includes features such as trip listing, detailed trip views, search and filtering capabilities, and pagination. The application leverages Ant Design for UI components and integrates with a Redux store for state management.

## Features

- **User Authentication**: Secure login and logout functionality.
- **Trip Listing**: Display a list of trips with pagination support.
- **Trip Details**: View detailed information about individual trips.
- **Search and Filter**: Search trips by passenger name, phone number, or status with highlighted matches.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Data Fetching**: Fetch trip data from an API endpoint using Redux.
- **Error Handling**: Display error messages for network issues.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A state management tool.
- **Ant Design**: A React UI library for building user interfaces.
- **react-responsive**: A library for handling responsive design.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

## Getting Started

### Prerequisites

- **Node.js** (version 12 or later)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**

   ```
   git clone [url]
   cd trips-management-system
   ```

2. **Install dependencies:**

   ```
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```
   npm start
   # or
   yarn start
   ```

## Usage

1. **Login**: Use the provided credentials to log in.
2. **View Trips**: Browse through the list of trips.
3. **Search and Filter**: Use the search bar to filter trips by passenger name, phone number, or status.
4. **View Trip Details**: Click on a trip to view detailed information.
5. **Logout**: Click the logout button to securely log out of the application.

## Project Structure

```
├── public/                     # Public assets
├── src/
│   ├── components/             # Reusable UI components
│   ├── store/                  # Redux store configuration
│   ├── App.tsx                 # Root component
│   ├── main.tsx               # Entry point
│   └── ...
├── package.json                # Project metadata and dependencies
└── ...
```

## Acknowledgements

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Ant Design](https://ant.design/)
- [react-responsive](https://github.com/contra/react-responsive)
