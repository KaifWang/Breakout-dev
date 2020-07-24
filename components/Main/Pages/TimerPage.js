import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions,Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TimerPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
          colors={['#C8E0E1', 'white']}
          style={styles.linearGradient}
        >
        <Text style={styles.time}>01:26</Text>
        <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate('Status Report')}>
          <Image style = {styles.image}
          source={require('../../../images/TimerButton.png')}></Image>
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
    width:"17%",
    height:"12%",
    alignItems:'center',
    justifyContent:'center',
  },
  image:{
    flex:1,
    width:300,
    height:300
  },
  linearGradient:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    width: Dimensions.get('window').width
  },
  time:{
    paddingBottom:250,
    fontFamily:'GillSans-Light',
    fontSize:40,
    color:'#83ACB2'
  }
});

export default TimerPage;

