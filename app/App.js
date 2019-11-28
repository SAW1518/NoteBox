import React, {Component} from 'react';
import AppNavigator from './AppNavigator';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './business/reducers';

let middleware = __DEV__
  ? applyMiddleware(thunk, createLogger())
  : applyMiddleware(thunk);
//let middleware = (__DEV__)? applyMiddleware( thunk, createLogger() ) : applyMiddleware( thunk );

const store = createStore(reducers, middleware);

console.ignoredYellowBox = ['Remote debugger'];

export default class App extends Component<void> {
  render() {
    if (!__DEV__) {
      console.log = () => {};
    }

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
