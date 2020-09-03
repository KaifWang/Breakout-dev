import React, {useState} from 'react';
import {View, Button, Text, StyleSheet, FlatList, Alert, InteractionManager} from 'react-native';
import 'react-native-get-random-values';
import {uuid} from 'uuidv4';
import Header from '../TaskPageUtil/Header';
import ListItem from '../TaskPageUtil/ListItem';
import AddItem from '../TaskPageUtil/AddItem';
import CompleteTask from '../TaskPageUtil/CompleteTask'

const TaskPage = ({navigation}) => {
  const [items, setItems] = useState([
    {id: uuid(), text: 'EECS281 Final', time: 120, selected: true},
    {id: uuid(), text: 'Play League of Legend', time: 240, selected: false},
    {id: uuid(), text: 'Eat budae jjigae', time: 60, selected: true},
    {id: uuid(), text: 'Say Goodnight', time: 20, selected: false},
    {id: uuid(), text: 'Sleep', time: 600, selected: false},
  ]);

  const [completeItems, setCompleteItems] = useState([
    {id: uuid(), text: 'Shower', time: 120, selected: true},
    {id: uuid(), text: 'Cook', time: 240, selected: false},
  ]);


  const selectItem = (id, isSelect) => {
    setItems((prevItems) =>{
      for(i = 0; i < prevItems.length ; ++i){
        if(prevItems[i].id == id){
          prevItems[i].selected = isSelect
        }
      }
      return prevItems
    })
  }
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
        return [{id: uuid(), text, time:0, selected: false}, ...prevItems];
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
            selectItem={selectItem}
            navigation={navigation}
          />
        )}
      ListFooterComponent={CompleteTask}
      />
      
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
});

export default TaskPage;
