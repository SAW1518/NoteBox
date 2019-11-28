import {Platform} from 'react-native';
import color from '../../utils/common/ColorsCommon';
import {height, width} from 'react-native-dimension';

export const StyleBar = {
  headerTitle: '',
  headerTintColor: color.white,
  headerMode: 'none',
  headerTitleStyle: {
    //  fontFamily: font.Helvetica
  },
  headerStyle: {
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    height: Platform.OS === 'android' ? height(11) : height(6),
    width: width(100),
    elevation: 0,
    //shadowColor : color.lightPurple,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    backgroundColor: color.dark,
    shadowRadius: 0,
    // fontFamily: font.Helvetica
  },
  barStyle: 'default',
  drawerLabel: '',
  style: {
    marginTop: Platform.OS === 'android' ? 30 : 0,
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 0,
  },
};

export const StyleBarWhite = {
  headerTitle: null,
  headerTintColor: '#0e2432',
  headerMode: 'float',
  headerStyle: {
    height: 60,
    width: width(100),
    top: 0,
    position: 'absolute',
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    backgroundColor: 'white',
  },
  barStyle: 'default',
  drawerLabel: 'Home',
  style: {
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
};

export const StyleBarTransparent = {
  headerTitle: '',
  headerTintColor: 'white',
  headerMode: 'none',
  headerTitleStyle: {
    // fontFamily: font.PTBold
  },
  headerStyle: {
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    height: Platform.OS === 'android' ? 60 : 40,
    borderBottomWidth: 0,
    width: width(100),
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    backgroundColor: 'transparent',
    shadowRadius: 0,
    // fontFamily: font.PTBold
  },
  barStyle: 'default',
  drawerLabel: '',
  style: {
    marginTop: Platform.OS === 'android' ? 30 : 0,
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 0,
    shadowColor: 'transparent',
  },
};
