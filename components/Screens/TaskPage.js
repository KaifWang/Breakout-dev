import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import 'react-native-get-random-values';
import {uuid} from 'uuidv4';
import Header from '../TaskPageUtil/Header';
import ListItem from '../TaskPageUtil/ListItem';
import AddItem from '../TaskPageUtil/AddItem';

const TaskPage = ({navigation}) => {
const [items, setItems] = useState([
  {id: uuid(), text: 'EECS281 Final Exam Prep'},
  {id: uuid(), text: 'Play League of Legend'},
  {id: uuid(), text: 'Eat budae jjigae'},
  {id: uuid(), text: 'Sleep'}
]);

const deleteItem = (id) => {
  setItems(prevItems => {
    return prevItems.filter(item => item.id != id)
    })
};

const addItem = (text) => {
  if(!text){
    Alert.alert('Error', 'Please enter an item');
  } else {
    setItems(prevItems => {
      return[{id:uuid(), text}, ...prevItems]
      });
  }
};


  return(
    <View style={styles.container}>
      <Header />
      <AddItem addItem = {addItem}/>
      <FlatList 
      data={items} 
      renderItem={({item}) => <ListItem item={item} 
      deleteItem={deleteItem}
      navigation={navigation}
       />}
      />
      </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex : 1,
    paddingTop:60
  }

});

export default TaskPage;