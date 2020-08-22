import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const AddItem = ({addItem}) => {
    const[text, setText] = useState('');
    const onChange = textValue => setText(textValue);

  return(
    <View>
      <TouchableOpacity style = {styles.btn} onPress={()=>addItem(text)}>
        <Icon
          name="plus-circle"
          size={30}
          color='#83ACB2'
          ></Icon>
        <Text style={styles.btnText}>Add New Task</Text>
      </TouchableOpacity>
    </View>
  )
};


const styles = StyleSheet.create({
    input:{
        height:60,
        padding:8,
        fontSize:16,
    },
    btn:{
        padding:9,
        margin:5,
        borderBottomWidth:1.1,
        borderBottomStartRadius:1000,
        borderColor:'#C8E0E1',
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    btnText:{
      marginLeft:20,
      color: '#EFBE8D',
      textAlign: 'center',
      fontFamily:'GillSans-Light',
      fontWeight:'300',
      fontSize:25
    }
});

export default AddItem;