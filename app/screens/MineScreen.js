import React, {Component} from 'react';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import FooterTabs from '../components/FooterTabs';
import {height, width} from 'react-native-dimension';
import NoteScreen from '../screens/NoteScreen';
import SchedulesScreen from '../screens/SchedulesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CacheUtil from '../utils/cache/CacheUtil';

type MineScreenProps = {
  navigation: any,
};
type MineScreenState = {
  selectedFooterIndex: number,
};

class MineScreen extends Component<MineScreenProps, MineScreenState> {
  static navigationOptions = {
    header: null,
  };

  state = {
    selectedFooterIndex: 0,
  };

  UNSAFE_componentWillMount(): void {
    CacheUtil.getInitial().then(initial => {
      if (initial !== null) {
        console.log('s.dms', initial)
        if (initial == 'Notas') {
          this.setState({
            selectedFooterIndex: 0,
          });
        } else if (initial == 'Horario') {
          this.setState({
            selectedFooterIndex: 1,
          });
        } else if (initial == 'Ajustes') {
          this.setState({
            selectedFooterIndex: 2,
          });
        } else if (initial == 'Perfil') {
          this.setState({
            selectedFooterIndex: 3,
          });
        }
      }
    });
  }

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
            height: height(10),
          }}
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
      case 2:
        return <SettingsScreen navigation={this.props.navigation} />;
      case 3:
        return <ProfileScreen navigation={this.props.navigation} />;
      default:
        break;
    }
  };
}

export default MineScreen;
