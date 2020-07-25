import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const ListItem = ({item, deleteItem, navigation}) => {

    
const [isSelected, setSelection] = useState(false);

  return(
    <TouchableOpacity style = {styles.listItem}>
     <View style={styles.listItemView}>
         <CheckBox
            value={isSelected}
            onValueChange={setSelection}
         />
         <Text style={styles.listItemText}> {item.text}</Text>
         <Button title = "Remove" color="firebrick" 
         onPress={() => deleteItem(item.id)} />
     </View>
    </TouchableOpacity>

  )
};


const styles = StyleSheet.create({
    listItem:{
        padding:15,
        backgroundColor:'#f8f8f8',
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    listItemView:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    listItemText:{
        fontSize:18
    }
})

export default ListItem;