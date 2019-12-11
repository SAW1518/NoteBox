import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import color from '../utils/common/ColorsCommon';
import {goAndNavigateTo} from '../NavigationUtil';
import firebase from '../config/firebase';
import AwesomeAlert from 'react-native-awesome-alerts';

type SignUpScreenProps = {
  navigation: any,
};

type SignUpScreenState = {};

class SignUpScreen extends Component<SignUpScreenPro, SignUpScreenState>{

    static navigationOptions = {
        header: null,
    };

    state = {
        email: '',
        nombre: '',
        password: '',
        escolaridad: '',
        showAlert: false,
        'message': '',
    };

    //Registrar al usuario
    singUp = () => {
        console.log('state: ', this.state);
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
            var uid;
            var user = firebase.auth().currentUser;
            uid = user.uid;

            let db = firebase.firestore()
            .collection("Usuarios")
            .doc(uid);

            db.set({
                name: this.state.nombre,
                email: this.state.email,
                escolaridad: this.state.escolaridad,
                password: this.state.password
            });

            this.setState({message: "Registro exitoso."});

            {this.showAlert()}
        })
        .catch(error => {
            console.log('error', error.toString());
            this.setState({
                message: "Ha ocurrido un error.",
                showAlert: true
            });
        });
    }

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

  redirect = () => {
     goAndNavigateTo(this.props.navigation, 'Mine')
  }

    UNSAFE_componentWillMount(): void {}

    componentDidMount() {}

    //Cargar componentes
    render() {
        const {showAlert} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../utils/icons/registro.png')}></Image>
                    <Text style={styles.title}>Introduce todos tus datos.</Text>
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Juanito"
                        returnKeyType="next"
                        placeholderTextColor={color.white}
                        onChangeText={text => this.setState({nombre: text})}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        autoCapitalize = "none"
                        returnKeyType="next"
                        keyboardType="email-address"
                        placeholder="test@example.com"
                        placeholderTextColor={color.white}
                        onChangeText={text => this.setState({email: text})}
                    />
                </View>    

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        autoCapitalize = "none"
                        returnKeyType="next"
                        placeholder="preparatoria"
                        placeholderTextColor={color.white}
                        onChangeText={text => this.setState({escolaridad: text})}
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
                <TouchableOpacity onPress={() => this.singUp()} style={styles.loginBtn}>
                    <Text>Registrar</Text>
                </TouchableOpacity>
                <Button 
                    title="Login" 
                    style={{marginBottom: 50}}
                    onPress={ () => goAndNavigateTo(this.props.navigation, 'Login') } 
                />

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

//Cargar estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4b4b4b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
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
        marginTop: 30,
        marginBottom: 15,
    },
    loginText: {
        color: 'white',
        marginBottom: 15,
    }, 
});

export default SignUpScreen