//@flow
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {goAndNavigateTo} from '../NavigationUtil';
import color from '../utils/common/ColorsCommon';
import firebase from '../config/firebase';
import {height, width} from 'react-native-dimension';
import AwesomeAlert from 'react-native-awesome-alerts';

type LoginScreenProps = {
  navigation: any,
};
type LoginScreenState = {};

class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: '',
    response: '',
  };

  login = () => {
    console.log('state', this.state);
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        console.log('response firebase', response);
        this.setState({
          response: 'Usuario logueado.',
        });
        goAndNavigateTo(this.props.navigation, 'Mine');
      })
      .catch(error => {
        //Error happend
        console.log('error', error.toString());
        this.setState({
          response: error.toString(),
        });
      });
  };

  UNSAFE_componentWillMount(): void {}

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={{
            width: width(60),
            height: width(40),
            resizeMode: 'stretch',
            marginBottom: height(2),
          }}
          source={require('../utils/icons/icon_Note_Box.png')}
        />
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="test@example.com"
            returnKeyType="next"
            keyboardType="email-address"
            placeholderTextColor={color.white}
            onChangeText={text => this.setState({email: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="********"
            returnKeyType="go"
            placeholderTextColor={color.white}
            onChangeText={text => this.setState({password: text})}
          />
        </View>
        <TouchableOpacity onPress={() => this.login()} style={styles.loginBtn}>
          <Text style={styles.loginText}>Inicio de Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goAndNavigateTo(this.props.navigation, 'SignUp') } >
          <Text style={styles.loginText}>Crear Cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goAndNavigateTo(this.props.navigation, 'Mine') } >
          <Text style={styles.loginText}>Anomino</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b4b4b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: color.white,
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: color.gray_ph,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default LoginScreen;
