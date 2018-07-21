import * as Actions from './actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import App from './App'

function mapStateToProps(state) {
  return {
    view: state.display.view,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
