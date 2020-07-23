//@todo Michael please integrate the timer component there.
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StatusReportPage = () => {
  return(
    <View style={styles.header}>
      <Text style={styles.text}> This is a status report</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  header:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  text:{
      color:'#fff',
      fontSize: 30,
      textAlign: 'center'
  }

})

export default StatusReportPage;