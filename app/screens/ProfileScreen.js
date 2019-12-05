//@flow
import React, {Component} from 'react';
import {goAndNavigateTo, goAndNavigateTowParams} from '../NavigationUtil';
import firebase from '../config/firebase';
import {View, Text, StyleSheet, Button} from 'react-native';
import color from '../utils/common/ColorsCommon';

type ProfileScreenProps = {
  navigation: any,
};
type ProfileScreenState = {};

class ProfileScreen extends Component<ProfileScreenProps, ProfileScreenState> {
  static navigationOptions = {
    header: null,
  };

  state = {
    user: null,
  };

  UNSAFE_componentWillMount(): void {}

  componentDidMount() {}

  logout() {
    firebase
      .auth()
      .signOut()
      .then(r => {
        console.log('renpose ', r);
      })
      .catch(e => {
        console.log('renpose ', e);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        <Button title="Logout" onPress={() => this.logout()} />
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
})

export default ProfileScreen;
