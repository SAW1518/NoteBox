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
import CacheUtil from '../utils/cache/CacheUtil';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';
import {goAndNavigateTo, goAndNavigateTowParams} from '../NavigationUtil';
import {monthMonthDate} from '../utils/common/StringsValidator';

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
        console.log('CacheUtil', JSON.parse(list));
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
      <Header
        androidStatusBarColor={color.dark}
        style={{backgroundColor: color.dark}}>
        <Body>
          <Title style={{marginVertical: height(3)}}> Notas</Title>
        </Body>
        <Right>
          <Button
            onPress={() =>
              goAndNavigateTowParams(this.props.navigation, 'NoteRegister', {
                type: {type: 'new'},
              })
            }
            transparent>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
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

  goTo = item => {
    goAndNavigateTowParams(this.props.navigation, 'NoteView', {
      id: item.id,
    });
    goAndNavigateTo(this.props.navigation, 'NoteView');
  }
  
  _renderNote = item => {
    let date = new Date(item.Fecha);
    return (
      <TouchableOpacity
        onPress={() => this.goTo(item)}
        style={{
          width: '100%',
          marginTop: width(5),
          borderRadius: width(3),
          flexDirection: 'row',
          backgroundColor: color.white,
        }}>
        <View
          style={{
            width: '25%',
            height: '100%',
            alignItems: 'center',
            padding: '2%',
          }}>
          <Text
            style={{
              fontSize: 25,
              color: color.green,
            }}>
            {date.getUTCDate()}
          </Text>
          <Text
            style={{
              marginTop: -width(1.5),
              fontSize: 15,
              color: color.gray,
            }}>
            {monthMonthDate(date)}
          </Text>
        </View>
        <View
          style={{
            width: '75%',
            height: '100%',
            padding: '2%',
          }}>
          <Text style={{color: color.dark, fontWeight: 'bold', fontSize: 16}}>
            {'Titulo: ' + item.Titulo}
          </Text>
          <Text style={{color: color.gray_ph, fontSize: 12}}>
            {'Tipo: ' + item.Tipo}
          </Text>
          <Text style={{color: color.gray_ph, fontSize: 12}}>
            {'Materia: ' + item.Materia}
          </Text>
          <View style={{flexDirection: 'row'}}>
            {item.docs.length !== 0
              ? item.docs.map((item, index) => {

                  return (
                    <View key={index}>
                      {this._renderDod(item)}
                    </View>
                  )
                })
              : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderDod = item => {
    let uriImg;
    if (item.extencin == 'text/plain') {
      uriImg = require('../utils/icons/icons8-txt-50.png');
    } else if (item.extencin == 'application/pdf') {
      uriImg = require('../utils/icons/adobe-acrobat-pdf-file-document-512.png');
    } else if (
      item.extencin ==
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ) {
      uriImg = require('../utils/icons/icons8-powerpoint-48.png');
    } else if (
      item.extencin ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      uriImg = require('../utils/icons/icons8-xls-48.png');
    } else if (item.extencin == 'application/msword') {
      uriImg = require('../utils/icons/icons8-word-48.png');
    }
    return (
      <View
        style={{
          width: width(8),
          height: width(8),
          backgroundColor: color.gray_back,
          borderRadius: width(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: width(5),
            width: width(5),
          }}
          source={uriImg}
          resizeMode={'cover'}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'column',
    marginTop: height(3),
    height: height(88),
    backgroundColor: color.dark,
  },
});

export default NoteScreen;
