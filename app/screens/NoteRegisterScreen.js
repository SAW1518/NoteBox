//@flow
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Platform,
} from 'react-native';
import {
  StyleBarTransparent,
  StyleBar,
  StyleBarWhite,
} from '../utils/common/StylesBarCommon';
import color from '../utils/common/ColorsCommon';
import {height, width} from 'react-native-dimension';
import ButtonComponent from '../components/ButtonComponent';
import {SegmentedControls} from 'react-native-radio-buttons';
import {Textarea, DatePicker} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CacheUtil from '../utils/cache/CacheUtil';
import {resetAndNavigateTo} from '../NavigationUtil';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

type NoteRegisterScreenProps = {
  navigation: any,
};
type NoteRegisterScreenState = {};

const options = ['Examen', 'Proyecto', 'Tarea'];
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
            backgroundColor: color.greenLight,
            width: '90%',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 21, paddingHorizontal: 16}}>
            {'Registro de Nota'}
          </Text>
        </View>
      ),
    };
  };
  items = [];

  state = {
    selectedSegment: 'Tipo',
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

  listExit = [];
  setList = () => {
    this.listExit = this.state.prebusList;
   // console.log(this.state);
    let newItem = {
      id: 2,
      Titulo: 'none',
      Materia: 'none',
      Fecha: 'none',
      Descripcion: 'none',
      docs: [],
    };
    newItem.Titulo = this.state.titulo;
    newItem.Materia = this.state.materia;
    newItem.Fecha = this.state.date.toISOString();
    newItem.Descripcion = this.state.descripcion;
    newItem.docs = this.state.docs
    this.listExit.push(newItem);
    console.log('listExit', this.listExit);
    CacheUtil.setList(JSON.stringify(this.listExit));
    resetAndNavigateTo(this.props.navigation, 'Mine');
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
            onPress={() => this.setList()}
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
      <View style={{width: width(70), marginTop: width(3)}}>
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
      <View>
        <Text
          style={{
            marginTop: height(2),
            fontWeight: 'bold',
            textAlign: 'left',
          }}>
          {'Titulo:'}
        </Text>
        <Textarea
          onChangeText={titulo => this.setState({titulo})}
          value={this.state.titulo}
          style={{width: width(80)}}
          rowSpan={2}
          bordered
        />
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'left',
          }}>
          {'Materia:'}
        </Text>
        <Textarea
          onChangeText={materia => this.setState({materia})}
          value={this.state.materia}
          style={{width: width(80)}}
          rowSpan={2}
          bordered
        />
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
            style={{height: width(5), width: width(5), tintColor: color.blue}}
            source={{
              uri:
                'https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-512.png',
            }}
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
          style={{width: width(80)}}
          rowSpan={5}
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
            width: width(80),
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: width(60),
            }}>
            {this.state.docs.map((item, key) => {
              return (
                <View key={key}>{this._renderList(item.extencin, item.name)}</View>
              );
            })}
          </View>
          <View
            style={{
              height: '100%',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: color.greenLight,
                borderRadius: width(5),
              }}
              onPress={() => this.selectOneFile()}>
              <Image
                style={{
                  height: width(10),
                  width: width(10),
                }}
                source={{
                  uri:
                    'https://cdn3.iconfinder.com/data/icons/rest/30/add_order-512.png',
                }}
                resizeMode={'cover'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  _renderList = (type, txt, key) => {
    let uriImg;
    if (type == '.txt') {
      uriImg = require('../utils/icons/txt.png');
    } else if (type == 'application/pdf') {
      uriImg = require('../utils/icons/pdf.png');
    } else if (
      type ==
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ) {
      uriImg = require('../utils/icons/pptx.png');
    } else if (
      type ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      uriImg = require('../utils/icons/xlsx.png');
    } else if (type == 'application/msword') {
      uriImg = require('../utils/icons/doc-icon.png');
    }
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          style={{
            height: height(4),
            width: height(4),
          }}
          source={uriImg}
          resizeMode={'cover'}
        />
        <Text
          style={{
            color: color.green,
            fontSize: 16,
          }}>
          {txt}
        </Text>
      </View>
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
