import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Settings from './Components/Settings';
import Game from './Pages/Game';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route path="/configuracoes">
        <Settings />
      </Route>
      <Route path="/feedback" component={ Feedback } />
      <Route path="/Ranking" component={ Ranking } />
    </Switch>
  );
}
