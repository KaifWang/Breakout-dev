import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import RestButton from '../TimerUtil/RestButton';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

function Timer({interval}) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const duration = moment.duration(interval);

  return (
    <Text style={styles.time}>
      {pad(duration.hours()) + ':' + pad(duration.minutes())}
    </Text>
  );
}

class TimerPage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      //popup = false means no pop up yet, true means already popup
      modalVisible: true,
    };
  }
  //modalVisible, a boolean variable, is the current visibility status of the pop-up window. true->show, false->hide
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;
    console.log(this.props.PopState);
    return (
      <View style={styles.container}>
        {this.props.PopState == false && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <ImageBackground
              style={styles.PopUpImage}
              source={require('../../../images/PopUpBackground.png')}>
              <TouchableHighlight
                onPress={
                  (() => this.setModalVisible(!modalVisible),
                  this.props.Start,
                  this.props.Pop)
                }>
                <Image
                  style={styles.PopUpButtonImage}
                  source={require('../../../images/PopUpButton.png')}></Image>
              </TouchableHighlight>
            </ImageBackground>
          </Modal>
        )}

        <LinearGradient
          colors={['#C8E0E1', 'white']}
          style={styles.linearGradient}>
          <Timer interval={this.props.Time} />
          <RestButton
            navigation={this.props.navigation}
            Stop={this.props.Stop}
          />
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: (SCREEN_WIDTH * 22) / 100,
    height: (SCREEN_HEIGHT * 13) / 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: SCREEN_WIDTH,
  },
  time: {
    paddingBottom: (SCREEN_HEIGHT * 40) / 100,
    fontFamily: 'GillSans-Light',
    fontSize: 40,
    color: '#83ACB2',
  },
  PopUpImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    width: '100%',
  },
  PopUpButtonImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '45%',
    width: (SCREEN_HEIGHT * 40) / 100,
    height: (SCREEN_HEIGHT * 40) / 100,
  },
});

export default TimerPage;
