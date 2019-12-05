//@flow
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import color from '../utils/common/ColorsCommon';
import {height, width} from 'react-native-dimension';
import CacheUtil from '../utils/cache/CacheUtil';
import {monthDayYearDate} from '../utils/common/StringsValidator';
import ListComponent from '../components/ListComponent';
import ButtonComponent from '../components/ButtonComponent';
import {resetAndNavigateTo, goTo, goAndNavigateTowParams} from '../NavigationUtil';
import {Icon, Fab} from 'native-base';
type NoteViewScreenProps = {
  navigation: any,
};
type NoteViewScreenState = {};

class NoteViewScreen extends Component<
  NoteViewScreenProps,
  NoteViewScreenState,
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    data: {},
    docs: [],
    alldata: [],
  };

  UNSAFE_componentWillMount(): void {
    console.log('id', this.props.navigation.state.params.id);
    CacheUtil.getList().then(list => {
      let Item = JSON.parse(list);
      this.setState({
        alldata: Item,
      });
      Item.map(item => {
        if (item.id === this.props.navigation.state.params.id) {
          this.setState({
            data: item,
            docs: item.docs,
          });
          console.log('Seted', item);
        }
      });
    });
  }

  newlist = [];
  delete = id => {
    let list = this.state.alldata;
    console.log('all', list);
    list.map(item => {
      if (item.id !== id) {
        this.newlist.push(item);
      }
    });
    console.log('newlist', this.newlist);
    CacheUtil.setList(JSON.stringify(this.newlist));
  }

  componentDidMount() {}

  render() {
    const {mainView} = styles;
    return (
      <View style={mainView}>
        {this._renderContain()}
        <Fab
          active={this.state.active}
          direction="up"
          onPress={() =>
            goAndNavigateTowParams(this.props.navigation, 'NoteRegister', {
              type: {type: 'Edit', item: this.state.data},
            })
          }
          // containerStyle={{ }}
          style={{backgroundColor: color.orange}}
          position="bottomLeft">
          <Icon type="Feather" name="edit" style={{color: color.white}} />
        </Fab>
        <Fab
          active={this.state.active}
          direction="up"
          onPress={() => {
            this.delete(this.props.navigation.state.params.id);
            resetAndNavigateTo(this.props.navigation, 'Mine');
          }}
          // containerStyle={{ }}
          style={{backgroundColor: color.green}}
          position="bottomRight">
          <Icon
            type="FontAwesome5"
            name="check-circle"
            style={{color: color.white}}
          />
        </Fab>
      </View>
    );
  }
  _renderContain = () => {
    return (
      <View
        style={{
          width: width(90),
          height: height(70),
          alignItems: 'center',
          padding: height(1),
          backgroundColor: color.white,
          borderRadius: width(3),
        }}>
        <View>
          {this._renderTitule()}
          <ScrollView style={{width: width(80)}}>
            {this._renderDate()}
            {this._renderDescripcion()}
            {this._renderDocs()}
          </ScrollView>
        </View>
      </View>
    );
  };

  _renderTitule = () => {
    return (
      <View
        style={{
          width: width(80),
          height: '20%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: color.dark,
          }}>
          {this.state.data.Titulo}
        </Text>
        <Text style={{color: color.gray_ph, fontSize: 15}}>
          {this.state.data.Tipo}
        </Text>
        <Text style={{color: color.gray_ph, fontSize: 15}}>
          {this.state.data.Materia}
        </Text>
      </View>
    );
  };

  _renderDate = () => {
    let date = new Date(this.state.data.Fecha);
    return (
      <View
        style={{
          width: '100%',
          height: '10%',
          justifyContent: 'center',
          flexDirection: 'column',
          paddingLeft: width(8),
        }}>
        <Text style={{color: color.dark, fontSize: 15, fontWeight: 'bold'}}>
          {monthDayYearDate(date)}
        </Text>
      </View>
    );
  };
  _renderDescripcion = () => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
          paddingHorizontal: width(8),
        }}>
        <Text style={{color: color.dark, fontSize: 15, fontWeight: 'bold'}}>
          {'Descripcion: '}
        </Text>
        <Text style={{color: color.gray, fontSize: 12}}>
          {this.state.data.Descripcion}
        </Text>
      </View>
    );
  };
  _renderDocs = () => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: color.dark,
            fontSize: 15,
            fontWeight: 'bold',
            marginHorizontal: width(8),
          }}>
          {'Archivos: '}
        </Text>
        <View>
          {this.state.docs.map((item, key) => {
            return (
              <View key={key}>
                <ListComponent item={item} />
              </View>
            );
          })}
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.dark,
  },
});

export default NoteViewScreen;
