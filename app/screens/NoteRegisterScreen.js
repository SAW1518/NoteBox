//@flow
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {StyleBar} from '../utils/common/StylesBarCommon';
import color from '../utils/common/ColorsCommon';
import {height, width} from 'react-native-dimension';
import ButtonComponent from '../components/ButtonComponent';
import {SegmentedControls} from 'react-native-radio-buttons';
import ListComponent from '../components/ListComponent';
import {Textarea, Item, Input} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CacheUtil from '../utils/cache/CacheUtil';
import {resetAndNavigateTo} from '../NavigationUtil';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Toast from 'react-native-simple-toast';

type NoteRegisterScreenProps = {
  navigation: any,
};
type NoteRegisterScreenState = {};

const options = ['Sin Definair', 'Examen', 'Proyecto', 'Tarea'];
class NoteRegisterScreen extends Component<
  NoteRegisterScreenProps,
  NoteRegisterScreenState,
> {
  static navigationOptions = ({navigation}) => {
    return {
      ...StyleBar,
      headerTitle: (
        <View
          style={{
            backgroundColor: color.gray_ph,
            width: '90%',
            alignItems: 'center',
          }}>
          <Text
            style={{color: color.gray, fontSize: 21, paddingHorizontal: 16}}>
            {'Registro de Nota'}
          </Text>
        </View>
      ),
    };
  };
  items = [];

  state = {
    selectedSegment: 'Sin Definair',
    prebusList: [],
    titulo: '',
    materia: '',
    descripcion: '',
    date: new Date(),
    mode: 'date',
    show: false,
    docs: [],
  };

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };
  UNSAFE_componentWillMount(): void {
    /// console.log('Type', this.props.navigation.state.params.type.item.id);
    if (this.props.navigation.state.params.type.type === 'Edit') {
      //console.log('id', this.props.navigation.state.params.type.item);
      const {
        Descripcion,
        Fecha,
        Materia,
        Tipo,
        Titulo,
        docs,
      } = this.props.navigation.state.params.type.item;
      console.log('DATE', new Date(Fecha));
      this.setState({
        selectedSegment: Tipo,
        titulo: Titulo,
        materia: Materia,
        descripcion: Descripcion,
        docs: docs,
        date: new Date(Fecha),
      });
    }
    CacheUtil.getList().then(List => {
      if (List !== null) {
        this.setState({
          prebusList: JSON.parse(List),
        });
      } else {
        console.log('NO List Cahe');
      }
    });
  }

  datepicker = () => {
    this.show('date');
  };

  timepicker = () => {
    this.show('time');
  };
  listNewDocs = [];
  async selectOneFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      RNFS.readFile(res.uri, 'base64').then(res64 => {
        console.log(res);
        let item = {
          base64: res64,
          extencin: res.type,
          name: res.name,
        };
        this.listNewDocs = this.state.docs;
        this.listNewDocs.push(item);
        this.setState({
          docs: this.listNewDocs,
        });
      });

      this.setState({singleFile: res});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from single doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  newlist = [];
  delete = id => {
    let list = this.state.prebusList;
    console.log('all', list);
    console.log('id', id);
    list.map(item => {
      if (item.id !== id) {
        this.newlist.push(item);
      }
    });
    let newItem = {
      id: this.getLastId(this.listExit) + 1,
      Tipo: '',
      Titulo: 'none',
      Materia: 'none',
      Fecha: 'none',
      Descripcion: 'none',
      docs: this.state.docs,
    };
    newItem.Titulo = this.state.titulo;
    newItem.Tipo = this.state.selectedSegment;
    newItem.Materia = this.state.materia;
    newItem.Fecha = this.state.date.toISOString();
    newItem.Descripcion = this.state.descripcion;
    newItem.docs = this.state.docs;
    this.newlist.push(newItem);
    console.log('newlist', this.newlist);
    CacheUtil.setList(JSON.stringify(this.newlist));
    resetAndNavigateTo(this.props.navigation, 'Mine');
  };

  validation = () => {
    if (this.state.titulo !== '') {
      if (this.state.materia !== '') {
        if (this.state.descripcion !== '') {
          if (this.props.navigation.state.params.type.type === 'Edit') {
            this.delete(this.props.navigation.state.params.type.item.id);
          } else {
            this.setList();
          }
        } else {
          Toast.showWithGravity(
            'Introduzca Descripcion',
            Toast.LONG,
            Toast.TOP,
          );
        }
      } else {
        Toast.showWithGravity('Introduzca Materia', Toast.LONG, Toast.TOP);
      }
    } else {
      Toast.showWithGravity('Introduzca Titulo', Toast.LONG, Toast.TOP);
    }
  };

  listExit = [];
  setList = () => {
    this.listExit = this.state.prebusList;
    //console.log(this.state);
    let newItem = {
      id: this.getLastId(this.listExit) + 1,
      Tipo: '',
      Titulo: 'none',
      Materia: 'none',
      Fecha: 'none',
      Descripcion: 'none',
      docs: this.state.docs,
    };
    newItem.Titulo = this.state.titulo;
    newItem.Tipo = this.state.selectedSegment;
    newItem.Materia = this.state.materia;
    newItem.Fecha = this.state.date.toISOString();
    newItem.Descripcion = this.state.descripcion;
    newItem.docs = this.state.docs;
    this.listExit.push(newItem);
    console.log('listExit', this.listExit);
    console.log('last id', newItem);
    CacheUtil.setList(JSON.stringify(this.listExit));
    resetAndNavigateTo(this.props.navigation, 'Mine');
  };

  getLastId = List => {
    let id = 0;
    List.map(Item => {
      if (Item.id >= id) {
        id = Item.id;
      }
    });
    return id;
  };
  render() {
    const {mainView} = styles;
    const {show, date, mode} = this.state;
    return (
      <View style={mainView}>
        {this._renderButtons()}
        {this._renderCard()}
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <ButtonComponent
            backgroundColor={color.red}
            title={'Cancelar'}
            width={width(40)}
          />
          <View style={{height: '100%', width: '10%'}} />
          <ButtonComponent
            backgroundColor={color.greenLight}
            title={'Crear'}
            onPress={() => this.validation()}
            width={width(40)}
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={this.setDate}
          />
        )}
      </View>
    );
  }

  _renderCard = () => {
    return (
      <View
        style={{
          width: width(90),
          height: height(70),
          alignItems: 'center',
          padding: height(1),
          backgroundColor: color.white,
          marginTop: height(1),
          borderRadius: width(3),
          marginBottom: height(2),
        }}>
        <ScrollView>{this._renderForm()}</ScrollView>
      </View>
    );
  };

  setSelectedOption = selectedSegment => {
    this.setState({
      selectedSegment: selectedSegment,
    });
  };
  _renderButtons = () => {
    return (
      <View style={{width: width(85), marginTop: width(3)}}>
        <SegmentedControls
          options={options}
          tint={color.gray}
          backTint={color.white}
          onSelection={this.setSelectedOption.bind(this)}
          selectedOption={this.state.selectedSegment}
        />
      </View>
    );
  };

  _renderForm = () => {
    const {show, date, mode} = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <Text
          style={{
            marginTop: height(2),
            fontWeight: 'bold',
            textAlign: 'left',
          }}>
          {'Titulo:'}
        </Text>
        <Item style={{width: '95%'}} regular>
          <Input
            onChangeText={titulo => this.setState({titulo})}
            value={this.state.titulo}
          />
        </Item>
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'left',
          }}>
          {'Materia:'}
        </Text>
        <Item regular style={{width: '95%'}}>
          <Input
            onChangeText={materia => this.setState({materia})}
            value={this.state.materia}
          />
        </Item>
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'left',
          }}>
          {'Fecha de Entrega:'}
        </Text>
        <TouchableOpacity
          style={{
            height: width(10),
            flexDirection: 'row',
          }}
          onPress={this.datepicker}>
          <Image
            style={{height: width(5), width: width(5), tintColor: color.gray}}
            source={require('../utils/icons/calendar.png')}
          />
          <Text testID="dateTimeText">
            {mode === 'date' && moment.utc(date).format('MM/DD/YYYY')}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'left',
          }}>
          {'Descripcion:'}
        </Text>
        <Textarea
          onChangeText={descripcion => this.setState({descripcion})}
          value={this.state.descripcion}
          style={{width: '95%'}}
          rowSpan={3}
          bordered
        />
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'left',
          }}>
          {'Archivos:'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: width(80),
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: '#d6d7da',
              }}
              onPress={() => this.selectOneFile()}>
              <Image
                style={{
                  height: height(3),
                  width: height(3),
                  tintColor: color.gray_ph,
                }}
                source={require('../utils/icons/add-file.png')}
                resizeMode={'cover'}
              />
              <Text
                style={{
                  color: color.gray_ph,
                  fontSize: 16,
                }}>
                {'Toca para agragar archivo'}
              </Text>
            </TouchableOpacity>
            {this.state.docs.map((item, key) => {
              return (
                <View key={key}>
                  <ListComponent item={item} />
                </View>
              );
            })}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: color.dark,
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default NoteRegisterScreen;
