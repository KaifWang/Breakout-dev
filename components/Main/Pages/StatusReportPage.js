//@todo Michael please integrate the timer component there.
//will do include moment to convert time into minutes and hours also need to reformate this
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function getTime(route) {
  return route.params.restTime;
}

const StatusReportPage = ({navigation, route}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}> This is a status report. </Text>
      <Text style={styles.text}>
        Hello {route.params.name}, Good job you have worked for{' '}
        {route.params.workTime}
        and have rested for {getTime(route)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default StatusReportPage;
