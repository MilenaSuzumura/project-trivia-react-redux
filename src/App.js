import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Components/Game';
import Settings from './componentes/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/configuracoes">
        <Settings />
      </Route>
    </Switch>
  );
}
