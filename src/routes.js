import React from 'react';
import App from './AppContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
      </div>
    </Router>
  )
};

export default Routes;
