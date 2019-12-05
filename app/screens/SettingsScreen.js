//@flow
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import color from '../utils/common/ColorsCommon';
import {height, width} from 'react-native-dimension';
import {goAndNavigateTowParams} from '../NavigationUtil';
import {
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Separator,
  Item,
} from 'native-base';
import CacheUtil from '../utils/cache/CacheUtil';

type SettingsScreenProps = {
  navigation: any,
};
type SettingsScreenState = {};

class SettingsScreen extends Component<
  SettingsScreenProps,
  SettingsScreenState,
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    selectedItem: undefined,
    selected1: 'Notas',
  };

  UNSAFE_componentWillMount(): void {
    CacheUtil.getInitial().then(initial => {
      if (initial !== null) {
        this.setState({
          selected1: initial,
        });
      }
    });
  }

  componentDidMount() {}

  onValueChange(value: string) {
    this.setState({
      selected1: value,
    });
    CacheUtil.setInitial(value);
  }
  _deleteNote = () => {
    CacheUtil.setList(JSON.stringify([]));
  };
  _deleteHorario = () => {
    CacheUtil.setHorario('');
  };

  render() {
    const {mainView} = styles;
    return (
      <View style={mainView}>
        {this._renderHeader()}
        {this._renderList()}
      </View>
    );
  }
  _renderHeader = () => {
    return (
      <Header
        androidStatusBarColor={color.dark}
        style={{backgroundColor: color.dark}}>
        <Body>
          <Title style={{marginVertical: height(3)}}> Ajustes</Title>
        </Body>
      </Header>
    );
  };
  _renderList = () => {
    return (
      <View>
        <ListItem icon>
          <Left>
            <Button style={{backgroundColor: color.greenLime}}>
              <Icon name={'gesture-tap-hold'} type={'MaterialCommunityIcons'} />
            </Button>
          </Left>
          <Body>
            <Text style={{color: color.white}}>Inicio de la aplicación</Text>
          </Body>
          <Right>
            <Picker
              note
              mode="dropdown"
              style={{width: 120}}
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}>
              <Item label="Notas" value="Notas" />
              <Item label="Horario" value="Horario" />
              <Item label="Ajustes" value="Ajustes" />
              <Item label="Perfil" value="Perfil" />
            </Picker>
          </Right>
        </ListItem>
        <ListItem last icon>
          <Left>
            <Button style={{backgroundColor: '#007AFF'}}>
              <Icon active name="clipboard-list" type={'FontAwesome5'} />
            </Button>
          </Left>
          <Body>
            <Text style={{color: color.white}}>Notas</Text>
          </Body>
          <Right>
            <Button
              onPress={() => this._deleteNote()}
              iconLeft
              danger
              style={{height: height(4), width: width(25)}}>
              <Icon active name="trash" />
              <Text style={{color: color.white}}>Eliminar </Text>
            </Button>
          </Right>
        </ListItem>
        <ListItem last icon>
          <Left>
            <Button style={{backgroundColor: '#007AFF'}}>
              <Icon name="calendar-clock" type={'MaterialCommunityIcons'} />
            </Button>
          </Left>
          <Body>
            <Text style={{color: color.white}}>Horario</Text>
          </Body>
          <Right>
            <Button
              onPress={() => this._deleteHorario()}
              iconLeft
              danger
              style={{height: height(4), width: width(25)}}>
              <Icon active name="trash" />
              <Text style={{color: color.gray_back}}>Eliminar </Text>
            </Button>
          </Right>
        </ListItem>
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

export default SettingsScreen;
