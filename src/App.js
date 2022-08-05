import React from 'react';
// import logo from './trivia.png';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      {/* <Route path="/carteira">
        <Wallet />
      </Route> */}
    </Switch>
  );
}
