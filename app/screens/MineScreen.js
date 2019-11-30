//@flow
import React, {Component} from 'react';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import FooterTabs from '../components/FooterTabs';
import {height, width} from 'react-native-dimension';
import NoteScreen from '../screens/NoteScreen';
import SchedulesScreen from '../screens/SchedulesScreen';


type MineScreenProps = {
  navigation: any,
};
type MineScreenState = {};

class MineScreen extends Component<MineScreenProps, MineScreenState> {
  static navigationOptions = {
    header: null,
  };

  state = {
    selectedFooterIndex: 0,
  };

  UNSAFE_componentWillMount(): void {}

  render() {
    return (
      <View
        style={{
          flex: 1,
          height: height(10),
          width: width(100),
        }}>
        <View
          style={{
            height: height(90),
          }}>
          {this._renderContent()}
        </View>

        <FooterTabs
          containerStyle={{
            borderTopLeftRadius: width(10),
            borderTopRightRadius: width(10),
            height: height(10)}}
          selectionHandler={selectedFooterIndex => {
            const selectionIndex = selectedFooterIndex;
            this.setState({selectedFooterIndex: selectionIndex});
          }}
          selectedIndex={this.state.selectedFooterIndex}
        />
      </View>
    );
  }

  _renderContent = () => {
    switch (this.state.selectedFooterIndex) {
      case 0:
        return <NoteScreen navigation={this.props.navigation} />;
      case 1:
        return <SchedulesScreen navigation={this.props.navigation} />;
      case 3:
      case 4:
        break;
      default:
        break;
    }
  };
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default MineScreen;
