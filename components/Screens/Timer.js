//@todo Michael please integrate the timer component there.
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions,Image} from 'react-native';
import TimerClock from '../TimerPageUtil/TimerClock';
import LinearGradient from 'react-native-linear-gradient';

const Timer = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
          colors={['#C8E0E1', 'white']}
          style={styles.linearGradient}
        >
        <TimerClock/>
        <TouchableOpacity onPress={() => navigation.navigate('Status Report')}>
          <Image 
          style = {styles.button}
          source={require('../../images/TimerButton.png')}></Image>
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
    width: 300,
    height: 300,
  },
  linearGradient:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    width: Dimensions.get('window').width
  }
});

export default Timer;

