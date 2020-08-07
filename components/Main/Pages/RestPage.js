import React, {useState, useRef} from 'react';
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
  Button,
} from 'react-native';
import TimerClock from '../TimerUtil/TimerClock';
import {ThemeProvider, useFocusEffect} from '@react-navigation/native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const RestPage = (props) => {
  const [WorkTime, setWorkTime] = useState(0);
  const [RestTime, setRestTime] = useState(0);
  const [PopUp, setPopUp] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const TimerClockRef = useRef();

  const timerSave = (time) => {
    setRestTime(time);
  };
  const Pop = () => {
    setPopUp(true);
  };
  React.useEffect(() => {
    if (props.route.params?.workTime) {
      setWorkTime(props.route.params?.workTime);
      TimerClockRef.current.Update(RestTime);
      TimerClockRef.current.Start();

      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [props.route.params?.workTime]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        TimerClockRef.current.Stop();
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      {PopUp == false && (
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
              onPress={(() => setModalVisible(!modalVisible), Pop)}>
              <Image
                style={styles.PopUpButtonImage}
                source={require('../../../images/PopUpButton.png')}
              />
            </TouchableHighlight>
          </ImageBackground>
        </Modal>
      )}
      <LinearGradient
        colors={['#C8E0E1', 'white']}
        style={styles.linearGradient}>
        <TimerClock Save={timerSave} Time={RestTime} ref={TimerClockRef} />
        <Text>We are resting</Text>
        <Button
          title="Back to Work"
          onPress={() =>
            props.navigation.navigate('Timer', {
              workTime: WorkTime,
            })
          }
        />
        <Button
          title="End Session"
          onPress={() =>
            props.navigation.navigate('Status Report', {
              restTime: RestTime,
              workTime: WorkTime,
              name: props.route.params.name,
            })
          }
        />
      </LinearGradient>
    </View>
  );
};
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

export default RestPage;
