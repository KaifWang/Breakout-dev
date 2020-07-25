import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const StartSessionPage = ({navigation})=>{
    return(
      <View style = {styles.container}>
      <Button title = "Start Session" color="#007AFF" 
           onPress={() => navigation.navigate('Tasks')} />
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

export default StartSessionPage;