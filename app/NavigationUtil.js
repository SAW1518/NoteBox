// @flow
import {NavigationActions, StackActions} from 'react-navigation';

let navigationName = '';

export const resetAndNavigateTo = (
  navigation: any,
  routeName: string,
  params: any,
) => {
  const actionToDispatch = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName, params})],
  });
  console.log(actionToDispatch);
  navigation.dispatch(actionToDispatch);
};

export const goBack = (navigation: any) => {
  navigationName = '';
  const actionToDispatch = NavigationActions.back();
  console.log('GO BACK', actionToDispatch);
  navigation.dispatch(actionToDispatch);
};

export const goAndNavigateTowParams = (
  navigation: any,
  routeName: string,
  params?: any,
) => {
  const actionToDispatch = NavigationActions.navigate({routeName, params});
  console.log('NAVIGATE WITH PARAMS', actionToDispatch);
  if (
    routeName !== actionToDispatch.actionToDispatch &&
    navigationName === ''
  ) {
    navigationName = 'undefined';
    navigation.dispatch(actionToDispatch);
    times();
  }
};

export const goAndNavigateTo = (navigation: any, routeName: string) => {
  const actionToDispatch = NavigationActions.navigate({routeName});
  console.log('NAVIGATE TO', actionToDispatch);
  if (
    routeName !== actionToDispatch.actionToDispatch &&
    navigationName === ''
  ) {
    navigationName = 'undefined';
    navigation.dispatch(actionToDispatch);
    times();
  }
};

const times = () => {
  setTimeout(() => {
    navigationName = '';
  }, 500);
};

export const goTo = async (navigation: any, routeName: string) => {
  goAndNavigateTo(navigation, routeName);
};
