# React Native Authentication with JWT

This project demonstrates a simple authentication system using **JWT** (JSON Web Tokens) in a React Native app. It includes login, registration, and user listing functionalities using a backend API.

## Features

- User registration
- User login with JWT
- Authentication state management
- Secure token storage using `expo-secure-store`
- Fetching and displaying a list of users from a protected endpoint

## Tech Stack

- **React Native** - Frontend framework for building mobile apps.
- **Axios** - HTTP client for making API requests.
- **JWT** - Token-based authentication.
- **Expo Secure Store** - Securely store and retrieve the JWT token.
- **React Navigation** - Navigation between screens.
- **Express** - For backend.

## Prerequisites

Before running the project, make sure you have the following tools installed:

- Node.js & npm
- Expo CLI: `npm install -g expo-cli`
- Backend API server that provides `/register`, `/login`, and `/users` endpoints (using JWT for authentication).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jerenat/react-native-auth-jwt.git
   ```

2. Navigate to the project directory:
   ```bash
   cd react-native-auth-jwt
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. If you are using Expo:
   ```bash
   expo install
   ```

## Running the Project

1. Start the Expo server:
   ```bash
   expo start --android
   ```

2. Open the app on a mobile device using the Expo Go app, or run it on an emulator.

## Environment Variables

You need to configure your backend API URL. Modify the following in your `AuthContext`:

```js
export const API_URL = "http://localhost:3000";
```

Make sure that your backend API provides endpoints for user registration, login, and fetching users.

## Project Structure

```
.
├── assets                  # Static assets (images, etc.)
├── components              # Reusable React components
├── context                 # Authentication context
│   └── AuthContext.js
├── screens                 # App screens (Login, Home, etc.)
│   ├── Home.jsx
│   └── Login.jsx
├── App.js                  # Main app entry point
├── README.md               # Project documentation
└── package.json            # Project dependencies and scripts
```

## Usage

### Register

1. Fill in a username and password on the registration screen.
2. Press "Create Account" to register a new user.

### Login

1. Enter the username and password on the login screen.
2. Press "Sign in" to authenticate the user.
3. Upon successful login, a token will be saved in secure storage.

### Users List

1. After login, navigate to the **Users** screen.
2. The app will fetch and display a list of users from the API.

## Dependencies

- `react-native` - Framework for mobile development.
- `axios` - HTTP client for API requests.
- `expo-secure-store` - Secure token storage.
- `react-navigation` - App navigation.
- `express` - Backend API

## Future Improvements

- Improve error handling and input validation.
- Add form validation on login and registration screens.
- Implement refresh token mechanism.
- Add loading indicators during API requests.

## Contributing

Feel free to submit issues or pull requests if you want to contribute to this project.

## License

This project is licensed under the MIT License.
