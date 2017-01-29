import React, { Component } from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, Link, IndexRoute} from 'react-router';
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, combineReducers} from 'redux'
import {fetchRocks} from './actions'
import thunk from 'redux-thunk';
import shyAReducer from './reducers'
import Rocks from './Rocks';
import AddRock from './AddRock';
import ReadRock from './ReadRock';
import CreateRock from './CreateRock';
import Brand from './Brand'
import ManagePane from './ManagePane'
import Activations from './Activations'
import MetaCIA from './MetaCIA'
import Laws from './Laws'
import Bugbount from './Bugbount'
import Donations from './Donations'
import Profile from './Profile'
import 'whatwg-fetch';
import 'babel-polyfill';


const store = createStore(
  shyAReducer,
  applyMiddleware(thunk)
)

class App extends Component {
  render() {
    return (
      <div>
	      {this.props.children}
      </div>
    )  
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute  component={Rocks} />
        <Route path="brand" component={Brand} />
        <Route path="meta" component={MetaCIA} />
        <Route path="laws" component={Laws} />
        <Route path="bugbount" component={Bugbount} />
        <Route path="donations" component={Donations} />
        <Route path="create" component={CreateRock} />
        <Route path="activations" component={Activations} />
        <Route path="profile" component={Profile} />
        <Route path="rocks/:id" component={ReadRock} />
        <Route path="users" component={ManagePane} />
      </Route>
    </Router> 
  </Provider>
  
, document.getElementById('root'));
