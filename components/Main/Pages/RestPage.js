//Temporary place holder for chat rooms and other activities
import React, {useState} from 'react';
import {Text, Image, View, StyleSheet, Button, Dimensions} from 'react-native';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';


const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

function Timer({interval}) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const duration = moment.duration(interval);

  return (
    <Text style={styles.time}>
      {pad(duration.hours()) + ':' + pad(duration.minutes())}
    </Text>
  );
}

const RestPage = (props) => {
  const [task, setTask] = useState({
    id: "1"
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Work Time</Text>
      <Timer interval={props.Time} />
      
      <View style = {styles.horizontal}>
        <Text style={styles.text}> working on:</Text>
        <Picker
          selectedValue={task.id}
          style = {styles.picker}
          
          onValueChange={(itemValue, itemIndex) =>
            setTask({id: itemValue})
          }>
          <Picker.Item label="final essay" value="task1" />
          <Picker.Item label="do survey" value="task2"/>
        </Picker>
      </View>
      <Image
          style={styles.image}
          source={require('../../../images/table.png')}>
      </Image>
      <Text>We are resting</Text>
      <Button title="Back to Work" onPress={props.Resume} />
      <Button
        title="End Session"
        onPress={() => props.navigation.navigate('Status Report', {time: props.Time})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#C8E0E1'
  },
  horizontal:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode:'contain',
    width: (SCREEN_WIDTH * 50) / 100,
    height: (SCREEN_HEIGHT * 40) / 100,
  },
  time: {
    fontFamily: 'GillSans-Light',
    fontSize: 60,
    color: '#83ACB2',
  },
  text: {
    fontFamily: 'GillSans-Light',
    fontSize: 20,
    color: '#83ACB2',
  },
  picker:{
    width: (SCREEN_WIDTH * 40) / 100,
    height: (SCREEN_HEIGHT * 10) / 100,
    color: '#83ACB2',
  }
});

export default RestPage;
