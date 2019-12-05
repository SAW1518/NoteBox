//@flow
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Body, Left, ListItem, Right} from 'native-base';
import {height, width} from 'react-native-dimension';
import {SharePdf64} from '../utils/common/StringsValidator';

type ListComponentProps = {
  item: any,
};
type ListComponentState = {};

class ListComponent extends Component<ListComponentProps, ListComponentState> {
  render() {
    let uriImg;
    if (this.props.item.extencin == 'text/plain') {
      uriImg = require('../utils/icons/icons8-txt-50.png');
    } else if (this.props.item.extencin == 'application/pdf') {
      uriImg = require('../utils/icons/adobe-acrobat-pdf-file-document-512.png');
    } else if (
      this.props.item.extencin ==
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ) {
      uriImg = require('../utils/icons/icons8-powerpoint-48.png');
    } else if (
      this.props.item.extencin ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      uriImg = require('../utils/icons/icons8-xls-48.png');
    } else if (this.props.item.extencin == 'application/msword') {
      uriImg = require('../utils/icons/icons8-word-48.png');
    } else {
      uriImg = require('../utils/icons/document-1.png');
    }
    return (
      <ListItem
        onPress={() =>
          SharePdf64(this.props.item.base64, this.props.item.extencin)
        }
        avatar>
        <Left>
          <Image
            style={{
              height: height(4),
              width: height(4),
            }}
            source={uriImg}
            resizeMode={'cover'}
          />
        </Left>
        <Body>
          <Text>{this.props.item.name}</Text>
        </Body>
        <Right />
      </ListItem>
    );
  }
};


export default ListComponent;
