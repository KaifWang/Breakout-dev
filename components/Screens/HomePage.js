import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
//@todo Victor please integrate the home page here. This is the entry point for starting the timer/task
const HomePage = ({navigation})=>{
    return(
      <View style = {styles.container}>
      <Button title = "Start Task" color="#007AFF" 
           onPress={() => navigation.navigate('Choose Mode')} />
      </View>
    )
  }

const styles = StyleSheet.create({
    container:{
        flex : 1,
        justifyContent: 'center',
        alignItems:'center'
    },
});

export default HomePage;