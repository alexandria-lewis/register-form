import React from 'react';
import logo from './assets/availity-logo.png';
import './App.css';

import Provider from './components/Providers/Providers';
import SignUpForm from './containers/SignUpForm/SignUpForm';

function App() {
  return (
    <div className="App">
      <Provider />
      <SignUpForm />
    </div>
  );
}

export default App;
