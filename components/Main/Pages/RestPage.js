//Temporary place holder for chat rooms and other activities
import React from 'react';
import {Text, View, StyleSheet, Button, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RestButton from '../TimerUtil/RestButton';
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

const RestPage = (props) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#C8E0E1', 'white']}
        style={styles.linearGradient}>
        <Timer interval={props.Time} />
        <Text>We are resting</Text>
        <Button title="Back to Work" onPress={props.Resume} />
        <Button
          title="End Session"
          onPress={() => props.navigation.navigate('Status Report', {time: props.Time})}
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
  time: {
    paddingBottom: (SCREEN_HEIGHT * 40) / 100,
    fontFamily: 'GillSans-Light',
    fontSize: 40,
    color: '#83ACB2',
  },
});

export default RestPage;
