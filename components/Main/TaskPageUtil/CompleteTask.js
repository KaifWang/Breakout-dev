import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const CompleteTask = () => {

  return(
    <View>
        <Text style={styles.completeTitle}> View Completed Tasks </Text>
    </View>
  )
};
const styles = StyleSheet.create({
    completeTitle:{
        fontSize: 25,
        color: '#EFBE8D',
        textAlign: 'center',
        fontFamily:'GillSans-SemiBold',
    }
});

export default CompleteTask;