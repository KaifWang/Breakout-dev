import React, { useState } from "react";
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, ImageBackground, Modal, TouchableHighlight} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const TimerPage = ({navigation}) => {
    //modalVisible, a boolean variable, is the current visibility status of the pop-up window. true->show, false->hide
    const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
      <ImageBackground style={styles.PopUpImage} source = {require('../../../images/PopUpBackground.png')}>
        <TouchableHighlight
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Image style={styles.PopUpButtonImage} source = {require('../../../images/PopUpButton.png')}></Image>
        </TouchableHighlight>
      </ImageBackground>
      </Modal>

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
    width:SCREEN_WIDTH * 22 / 100,
    height:SCREEN_HEIGHT * 13 / 100,
    alignItems:'center',
    justifyContent:'center',
  },
  image:{
    flex:1,
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,
  },
  linearGradient:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    width: SCREEN_WIDTH
  },
  time:{
    paddingBottom:SCREEN_HEIGHT * 40 / 100,
    fontFamily:'GillSans-Light',
    fontSize:40,
    color:'#83ACB2'
  },
  PopUpImage: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
    width: "100%",
  },
  PopUpButtonImage:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: "45%",
    width: SCREEN_HEIGHT * 40 / 100,
    height: SCREEN_HEIGHT * 40 / 100
  }
});

export default TimerPage;

