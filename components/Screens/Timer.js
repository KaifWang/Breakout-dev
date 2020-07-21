//@todo Michael please integrate the timer component there.
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import TimerClock from '../TimerPageUtil/TimerClock';

const Timer = ({navigation}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Timer starts!</Text>
      <Button
        title="End Timer"
        color="red"
        onPress={() => navigation.navigate('Status Report')}
      />
      <TimerClock />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkslateblue',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Timer;

