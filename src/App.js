import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter } from './routes/AppRouter';

import './fondo.css'

export class App extends Component {
  render() {
    return (
      <div>
        <AppRouter/>
      </div>
    )
  }
}

export default App
