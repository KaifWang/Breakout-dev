import React, {Component, useState, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import RestButton from '../TimerUtil/RestButton';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import TimerClock from '../TimerUtil/TimerClock';
import {useFocusEffect} from '@react-navigation/native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const TimerPage = (props) => {
  //popup = false means no pop up yet, true means already popup
  const [WorkTime, setWorkTime] = useState(props.route.params.workTime);

  const TimerClockRef = useRef();
  //modalVisible, a boolean variable, is the current visibility status of the pop-up window. true->show, false->hide

  const timerSave = (time) => {
    setWorkTime(time);
  };

  useFocusEffect(
    React.useCallback(() => {
      setWorkTime(props.route.params.workTime);
      TimerClockRef.current.Update(props.route.params.workTime);
      TimerClockRef.current.Start();

      return () => {
        TimerClockRef.current.Stop();
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#C8E0E1', 'white']}
        style={styles.linearGradient}>
        <TimerClock Save={timerSave} Time={WorkTime} ref={TimerClockRef} />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate('Rest', {
              workTime: WorkTime,
            })
          }>
          <Image
            style={styles.image}
            source={require('../../../images/TimerButton.png')}
          />
        </TouchableOpacity>
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
});

export default TimerPage;
