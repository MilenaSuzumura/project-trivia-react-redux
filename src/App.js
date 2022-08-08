import React from 'react';
// import logo from './trivia.png';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Settings from './componentes/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/configuracoes">
        <Settings />
      </Route>
    </Switch>
  );
}
