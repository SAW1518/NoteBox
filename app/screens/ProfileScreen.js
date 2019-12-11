//@flow
import React, {Component} from 'react';
import {
  goAndNavigateTo,
   goAndNavigateTowParams
} from '../NavigationUtil';
import firebase from '../config/firebase';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  StatusBar
} from 'react-native';
import color from '../utils/common/ColorsCommon';
import AwesomeAlert from 'react-native-awesome-alerts';

type ProfileScreenProps = {
  navigation: any,
};
type ProfileScreenState = {};

class ProfileScreen extends Component<ProfileScreenProps, ProfileScreenState> {
  static navigationOptions = {
    header: null,
  };

  state = {
    uid: null,
    email: '',
    nombre: '',
    password: '',
    validaPassword: '',
    escolaridad: '',
    showAlert: false,
    'message': ''
  };

  UNSAFE_componentWillMount() {}

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  updateUser = () => {
    if (this.state.validaPassword == this.state.password) {

      var dbRef = firebase.firestore()
      .collection("Usuarios")
      .doc(this.state.uid)
      .set({
        email: this.state.email,
        name: this.state.nombre,
        escolaridad: this.state.escolaridad,
        password: this.state.validaPassword
      }).then( response => {
        this.setState({
          message: 'Información actualizada.'
        });
      }).catch( error => {
        this.setState({
          message: 'Ha ocurrido un error.'
        });
      });
    }else{
      this.setState({
        message: 'La contraseña es incorrecta.'
      });
    }

      {this.showAlert()}
  };

  componentDidMount() {
    const user = firebase.auth().currentUser;
    var uid = user.uid;

    var docRef = firebase.firestore()
    .collection("Usuarios")
    .doc(uid);

    docRef.get().then( doc => {
    //Get data from firestore
    if (doc.exists) {
        console.log("Información obtenida: ", doc.data());
        this.setState({
          uid: uid,
          nombre: doc.data().name,
          email: doc.data().email,
          password: doc.data().password,
          escolaridad: doc.data().escolaridad
        });
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch(error => {
        console.log("Error en el documento: ", error);
    });
  }

  logout = () => {
    console.log('Usuario: ', this.state.user);
    firebase
      .auth()
      .signOut()
      .then(r => {
        console.log('renpose ', r);
        goAndNavigateTo(this.props.navigation, 'Login')
      })
      .catch(e => {
        console.log('renpose ', e);
    });
  }

  redirect = () => {
    console.log("Redireccionar al mine...")
     goAndNavigateTo(this.props.navigation, 'Mine')
  }

  render() {
    const {showAlert} = this.state;
    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content"></StatusBar>
        <Text style={styles.name}>Perfil de Usuario</Text>

          <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Juanito Lopez"
                returnKeyType="next"
                placeholderTextColor={color.white}
                value={this.state.nombre}
                onChangeText={text => this.setState({nombre: text})}
              />
          </View>

          <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Juanito@example.mx"
                returnKeyType="next"
                placeholderTextColor={color.white}
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
              />
          </View>

          <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Preparatoria"
                autoCapitalize = "none"
                returnKeyType="next"
                placeholderTextColor={color.white}
                onChangeText={text => this.setState({escolaridad: text})}
                value={this.state.escolaridad}
              />
          </View>

          <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="********"
                autoCapitalize = "none"
                returnKeyType="go"
                onChangeText={text => this.setState({validaPassword: text})}
                placeholderTextColor={color.white}
              />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={() => this.updateUser()}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Actualizar</Text>
          </TouchableOpacity>
        <Button
          title="Logout"
          style={{marginTop: 60}}
          onPress={() => this.logout()} />

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Status"
          message="Estado de la solicitud: "
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText= {this.state.message}
          confirmButtonColor="#5cb85c"
          onConfirmPressed={() => {
            this.redirect();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginTop: 24,
    marginBottom: 50,
    fontSize: 32,
    fontWeight: "600",
    color: 'red'
  },
  title: {
      color: '#FFF',
      marginTop: 10,
      width: 120,
      textAlign: 'center',
      opacity: 0.9
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
  loginBtn: {
    width: '80%',
    backgroundColor: '#5cb85c',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
})

export default ProfileScreen;
