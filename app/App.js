import React, {Component} from 'react';
import AppNavigator from './AppNavigator';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './business/reducers';
import {PermissionsAndroid} from 'react-native';

let middleware = __DEV__
  ? applyMiddleware(thunk, createLogger())
  : applyMiddleware(thunk);
//let middleware = (__DEV__)? applyMiddleware( thunk, createLogger() ) : applyMiddleware( thunk );

const store = createStore(reducers, middleware);

console.ignoredYellowBox = ['Remote debugger'];

export default class App extends Component<void> {
  async PermissionsCam() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async PermissionsStoWRITE() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  UNSAFE_componentWillMount(): void {
    this.PermissionsCam();
    this.PermissionsStoWRITE();
  }

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
