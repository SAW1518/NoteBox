//@flow
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
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
  items = [{name: 'DOC1', ext: '.txt'}, {name: 'DOC2', ext: '.pdf'}];

  state = {
    selectedSegment: 'Tipo',
    chosenDate: new Date(),
    titulo: '',
    materia: '',
    descripcion: '',
  };

  render() {
    const {mainView} = styles;
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
            onPress={() => console.log(this.state)}
            width={width(40)}
          />
        </View>
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
        <DatePicker
          defaultDate={new Date(2019, 4, 4)}
          minimumDate={new Date(2019, 1, 1)}
          maximumDate={new Date(2019, 12, 31)}
          locale={'es'}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={'fade'}
          androidMode={'default'}
          placeHolderText="Select date"
          textStyle={{color: 'green'}}
          placeHolderTextStyle={{color: '#d3d3d3'}}
          onDateChange={this.setDate}
          disabled={false}
        />
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
          style={{width: width(80)}} rowSpan={5} bordered />
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
            {this.items.map((item, key) => {
              return (
                <View key={key}>{this._renderList(item.ext, item.name)}</View>
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
              }}>
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
    } else if (type == '.pdf') {
      uriImg = require('../utils/icons/pdf.png');
    } else if (type == '.pptx') {
      uriImg = require('../utils/icons/pptx.png');
    } else if (type == '.xlsx') {
      uriImg = require('../utils/icons/xlsx.png');
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
