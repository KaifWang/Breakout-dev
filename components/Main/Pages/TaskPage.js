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
        return [{id: uuid(), text, time:0}, ...prevItems];
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} items={items} setItems={setItems}/>
      <Text style={styles.tips}>
        Select tasks to start the session
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
      <Text style={styles.completeTitle}>View Completed Task</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor:'white'
  },
  tips: {
    marginTop:10,
    marginBottom:10,
    fontSize: 25,
    color: '#EFBE8D',
    textAlign: 'center',
    fontFamily:'GillSans-Light',
    fontWeight:'300'
  },
  completeTitle:{
    fontSize: 25,
    color: '#EFBE8D',
    textAlign: 'center',
    fontFamily:'GillSans-SemiBold',
  }
});

export default TaskPage;
