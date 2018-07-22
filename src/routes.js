import React from 'react';
import App from './AppContainer';
import Alternative from './AlternativeContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
          <Route path="/alternative" component={ Alternative } />
      </div>
    </Router>
  )
};

export default Routes;
