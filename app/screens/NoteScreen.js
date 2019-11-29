//@flow
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import color from '../utils/common/ColorsCommon';
import {width, height} from 'react-native-dimension';
import {
  resetAndNavigateTo,
  goAndNavigateTowParams,
  goBack,
  goAndNavigateTo,
} from '../NavigationUtil';
import CacheUtil from '../utils/cache/CacheUtil';

type NoteScreenProps = {
  navigation: any,
};
type NoteScreenState = {};

class NoteScreen extends Component<NoteScreenProps, NoteScreenState> {
  static navigationOptions = {
    header: null,
  };

  state = {
    ListNote: [],
  };

  UNSAFE_componentWillMount(): void {
    CacheUtil.getList().then(list => {
      if (list !== null) {
        this.setState({
          ListNote: JSON.parse(list),
        });
      }
    });
  }

  componentDidMount() {}

  render() {
    const {mainView} = styles;
    return (
      <View style={mainView}>
        {this._renderHeader()}
        {this._renderContent()}
      </View>
    );
  }

  _renderHeader = () => {
    return (
      <View
        style={{
          height: height(8),
          width: width(100),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={{width: '90%', height: '100%'}} />
        <TouchableOpacity
          onPress={() =>
            goAndNavigateTo(this.props.navigation, 'NoteRegister')
          }>
          <Text style={{color: color.greenLight}}>{'ADD'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderContent = () => {
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <ScrollView style={{width: '90%', height: '89%'}}>
          {this.state.ListNote.map((item, key) => {
            return <View key={key}>{this._renderNote(item)}</View>;
          })}
        </ScrollView>
      </View>
    );
  };
  _renderNote = item => {
    return (
      <View
        style={{
          width: '100%',
          height: height(15),
          marginTop: width(5),
          borderRadius: width(3),
          flexDirection: 'column',
          backgroundColor: color.white,
          padding: width(2),
        }}>
        <Text>{'Titulo :' + item.Titulo}</Text>
        <Text>{'Materia :' + item.Materia}</Text>
        <Text>{'Descripcion :' + item.Descripcion}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: height(3),
    height: height(88),
    backgroundColor: color.dark,
  },
});

export default NoteScreen;
