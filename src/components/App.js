import React, { Component } from 'react';
import NavBar from './NavBar'

class App extends Component {
  render() {
    return (
      <div> 
        <NavBar />
        <div className="container">
          <h1>PSU GO!</h1>
        </div>
      </div>
    );
  }
}

export default App;
