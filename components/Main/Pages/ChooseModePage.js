import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const ChooseModePage = ({navigation}) =>{
  return(
    <View style = {styles.container}>
    <Button title = "Start a Task from Task List" color="#007AFF" 
         onPress={() => navigation.navigate('Tasks')} />
    <Button title = "Start and add to Task List later" color="#007AFF" 
         onPress={() => navigation.navigate('Timer')} />
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

export default ChooseModePage;