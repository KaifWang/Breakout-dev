import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const ListItem = ({item, selectItem}) => {

const [isSelected, setSelection] = useState(false);

  return(
    <TouchableOpacity style = {styles.listItem}>
     <View style={styles.listItemView}>
         <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            tintColor='#83ACB2'
            onCheckColor='#EFBE8D'
            onTintColor='#83ACB2'
         />
        {selectItem(item.id, isSelected)}
         <Text style={styles.listItemText}> {item.text}</Text>
     </View>
    </TouchableOpacity>
  )

};


const styles = StyleSheet.create({
    listItem:{
        padding:15,
        borderBottomWidth:1,
        borderColor:'#C8E0E1',
        alignItems:'flex-start',
        borderBottomStartRadius:100,
    },
    listItemView:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    listItemText:{
        marginLeft:10,
        marginRight:20,
        fontSize: 25,
        fontFamily: 'GillSans-Light',
        fontWeight:'300',
        color:'#83ACB2'
    }
})

export default ListItem;