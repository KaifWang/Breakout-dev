//@todo Michael please integrate the timer component there.
import React, { useState } from "react";
import {Alert, Modal, StyleSheet, Image, ImageBackground, Text, TouchableHighlight, View, Button} from "react-native";

const Timer = ({navigation}) => {
  //modalVisible, a boolean variable, is the current visibility status of the pop-up window. true->show, false->hide
  const [modalVisible, setModalVisible] = useState(true);

  return(
    <View style={styles.header}>
      <Text style={styles.text}>Timer starts!</Text>



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
      <ImageBackground style={styles.PopUpImage} source = {require('../../src/Alert.png')}>
        <TouchableHighlight
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Image style={styles.PopUpButtonImage} source = {require('../../src/OK.png')}></Image>
        </TouchableHighlight>
      </ImageBackground>

      </Modal>



      <Button title = "End Timer" color="red" 
           onPress={() => navigation.navigate('Status Report')} />
    </View>
  )
};

const styles = StyleSheet.create({
  header:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkslateblue'
  },
  text:{
      color:'#fff',
      fontSize: 30,
      textAlign: 'center'
  },
  PopUpImage: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 220,
    marginLeft: "5%",
    width: 400,
    height: 400
  },
  PopUpButtonImage:{
    marginTop: 180,
    width: 400,
    height: 400
  }
});
export default Timer;