//@flow
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import color from '../utils/common/ColorsCommon';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {height, width} from 'react-native-dimension';
import PDFView from 'react-native-view-pdf';
import CacheUtil from '../utils/cache/CacheUtil';
import {Body, Button, Header, Icon, Right, Title} from 'native-base';
import {goAndNavigateTowParams} from '../NavigationUtil';
import {SharePdf64} from '../utils/common/StringsValidator';
type SchedulesScreenProps = {
  navigation: any,
};
type SchedulesScreenState = {
  file: '',
  type: '',
};

class SchedulesScreen extends Component<
  SchedulesScreenProps,
  SchedulesScreenState,
> {
  static navigationOptions = {
    header: null,
  };

  state = {
    file: '',
  };

  UNSAFE_componentWillMount(): void {
    CacheUtil.getHORARIO().then(HORARIO => {
      if (HORARIO !== null) {
        console.log('GET hWil', HORARIO);
        this.setState({
          file: HORARIO,
        });
      }
    });
  }

  async selectOneFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      RNFS.readFile(res.uri, 'base64').then(res => {
        this.setState({
          file: res,
        });
        CacheUtil.setHorario(res);
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

  render() {
    if (this.state.file === '') {
      return this._renderEmpty();
    } else {
      return this._renderPDF();
    }
  }
  _renderEmpty = () => (
    <SafeAreaView style={{flex: 1, marginTop: height(3)}}>
      <Header
        androidStatusBarColor={color.dark}
        style={{backgroundColor: color.dark}}>
        <Body>
          <Title style={{marginVertical: height(3)}}> Horario</Title>
        </Body>
      </Header>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.dark,
          height: '100%',
          width: '100%',
        }}>
        <TouchableOpacity onPress={() => this.selectOneFile()}>
          <Image
            style={{
              height: width(25),
              width: width(25),
            }}
            source={{
              uri: 'https://img.icons8.com/bubbles/2x/add.png',
            }}
            resizeMode={'cover'}
          />
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'left',
              color: color.white,
            }}>
            {'Seleccone Archivo '}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  _renderPDF = () => (
    <SafeAreaView style={{flex: 1, marginTop: height(3)}}>
      <Header
        androidStatusBarColor={color.dark}
        style={{backgroundColor: color.dark}}>
        <Body>
          <Title style={{marginVertical: height(3)}}> Horario</Title>
        </Body>
      </Header>
      <PDFView
        style={{flex: 1}}
        onError={error => console.log('onError', error)}
        onLoad={() => console.log('PDF rendered from base 64 dataSignIn')}
        resource={this.state.file}
        resourceType={'base64'}
      />
      {this._renderDownload()}
    </SafeAreaView>
  );

  _renderDownload = () => {
    return (
      <View
        style={{
          backgroundColor: color.dark,
          flexDirection: 'column',
          justifyItems: 'center',
          alignItems: 'center',
          bottom: 0,
        }}>
        <Button
          full
          style={{backgroundColor: color.dark}}
          onPress={() => SharePdf64(this.state.file, 'application/pdf')}>
          <Title style={{marginVertical: height(3)}}> Compartir</Title>
          <Icon name={'share-alternative'} type={'Entypo'} />
        </Button>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});

export default SchedulesScreen;
