import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
} from 'native-base';
import {height, width} from 'react-native-dimension';
import {StyleSheet} from 'react-native';
import color from '../utils/common/ColorsCommon';

type FooterTabsProps = {
  selectionHandler: number => void,
  selectedIndex: number,
  containerStyle: any,
};
type FooterTabsState = {};

class FooterTabs extends Component<FooterTabsProps, FooterTabsState> {
  state = {
    TabSeleccion: 0,
  };

  componentDidMount() {}

  render() {
    const {selectedIndex, containerStyle} = this.props;
    return (
      <Container>
        <Footer
          style={{
            backgroundColor: color.dark,
        }}
        >
          <FooterTab
            activeBgColor={'white'}
            style={[
              {
                backgroundColor: 'white',
              },
              containerStyle,
            ]}>
            <Button vertical onPress={() => this.props.selectionHandler(0)}>
              <Icon
                style={{
                  color: selectedIndex === 0 ? color.greenLime : color.dark,
                }}
                name="clipboard-list"
                type={'FontAwesome5'}
              />
              <Text
                style={{
                  color: selectedIndex === 0 ? color.greenLime : color.dark,
                }}>
                Notas
              </Text>
            </Button>
            <Button vertical onPress={() => this.props.selectionHandler(1)}>
              <Icon
                style={{
                  color: selectedIndex === 1 ? color.greenLime : color.dark,
                }}
                name="calendar-clock"
                type={'MaterialCommunityIcons'}
              />
              <Text
                style={{
                  color: selectedIndex === 1 ? color.greenLime : color.dark,
                }}>
                Horario
              </Text>
            </Button>
            <Button vertical onPress={() => this.props.selectionHandler(2)}>
              <Icon
                style={{
                  color: selectedIndex === 2 ? color.greenLime : color.dark,
                }}
                active
                name="gear"
                type={'FontAwesome'}
              />
              <Text
                style={{
                  color: selectedIndex === 2 ? color.greenLime : color.dark,
                }}>
                Ajustes
              </Text>
            </Button>
            <Button vertical onPress={() => this.props.selectionHandler(3)}>
              <Icon
                style={{
                  color: selectedIndex === 3 ? color.greenLime : color.dark,
                }}
                name="person"
              />
              <Text
                style={{
                  color: selectedIndex === 3 ? color.greenLime : color.dark,
              }}>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {},
  icon: {},
  Button: {},
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});

export default FooterTabs;
