import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import {
  height ,
  width
} from 'react-native-dimension';

import color from '../utils/common/ColorsCommon';

type ButtonComponentProps = {
  title: string,
  width?: number,
  height?: number,
  marginHorizontal?: number,
  marginVertical?: number,
  onPress: () => void,
  backgroundColor?: string,
  fontColor?: string,
};

export default class ButtonComponent extends Component<ButtonComponentProps> {
  render() {
    const {
      title,
      marginHorizontal,
      marginVertical,
      onPress,
      backgroundColor,
      fontColor,
    } = this.props;

    return (
      <Button
        textStyle={{fontSize: 14, color: fontColor || 'white'}}
        title={this.props.title}
        containerViewStyle={{
          marginHorizontal: marginHorizontal || width(5),
          marginVertical: marginVertical || 0,
          width: this.props.width || width(80),
          alignSelf: 'center',
        }}
        buttonStyle={{
          backgroundColor: backgroundColor,
          paddingVertical: width(2),
          width: this.props.width,
        }}
        borderRadius={height(4)}
        onPress={onPress}
      />
    );
  }
}
