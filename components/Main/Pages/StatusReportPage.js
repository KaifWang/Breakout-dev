//@todo Michael please integrate the timer component there.
//will do include moment to convert time into minutes and hours also need to reformate this
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

const StatusReportPage = ({navigation, route}) => {
  return(
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
          <Text style={styles.headerText}>Done</Text>
      </SafeAreaView>
      <ScrollView >
        <View style={styles.part}>
          <Text style={styles.text}> Graph comes here. </Text>
        </View>
        <View style={styles.part}>
          Hello {route.params.name}, Good job you have worked for{' '}
          {route.params.workTime}
          and have rested for {route.params.restTime}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.1,
    height: 11,
    backgroundColor: '#CADEDF',
    flexDirection: 'column',
    marginBottom: 2,
  },
  headerText:{
    color:'#FFFFFF',
    fontSize: 30,
    textAlign: 'right',
    marginTop: 30,
    marginRight: 30,
  },
  part: {
    marginBottom: 2,
    backgroundColor: '#CADEDF',
  },
  text:{
    color:'#FFFFFF',
    fontSize: 30,
  },

})

export default StatusReportPage;
