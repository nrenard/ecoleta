import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const src: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/cadastro" component={CreatePoint} exact />
    </Switch>
  );
}

export default src;