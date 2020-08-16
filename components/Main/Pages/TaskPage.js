import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, FlatList, Alert} from 'react-native';
import 'react-native-get-random-values';
import {uuid} from 'uuidv4';
import Header from '../TaskPageUtil/Header';
import ListItem from '../TaskPageUtil/ListItem';
import AddItem from '../TaskPageUtil/AddItem';

const TaskPage = ({navigation}) => {
  const [items, setItems] = useState([
    {id: uuid(), text: 'EECS281 Final', time: 120},
    {id: uuid(), text: 'Play League of Legend', time: 240},
    {id: uuid(), text: 'Eat budae jjigae', time: 60},
    {id: uuid(), text: 'Say Goodnight', time: 20},
    {id: uuid(), text: 'Sleep', time: 600},
  ]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id != id);
    });
  };

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item');
    } else {
      setItems((prevItems) => {
        return [{id: uuid(), text, time: 0}, ...prevItems];
      });
    }
  };

  const JSONConvert = (items) => {
    console.log(items);
    var result = new Object();
    for (task in items) {
      var temp = {
        text: task.text,
        time: task.time,
      };
      result[task.id] = temp;
    }
    console.log(result);
    return JSON.stringify(result); //converting javascript object into JSON string
  };
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.tips}>
        (Please selete the tasks you want to work on in this session)
      </Text>
      <AddItem addItem={addItem} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            navigation={navigation}
          />
        )}
      />
      <Button
        title="Next"
        color="#007AFF"
        onPress={() =>
          navigation.navigate('Rest', {
            name: 'Michael',
            tasks: JSON.stringify(items),
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  tips: {
    color: 'grey',
    textAlign: 'center',
  },
});

export default TaskPage;
