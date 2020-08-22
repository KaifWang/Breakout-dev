import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const Header = ({navigation, items, setItems}) => {
  return(
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewMeeting')}>
            <Image
            source={require('../../../images/Arrow.png')}
            style={styles.ArrorImage}
            >
            </Image>
        </TouchableOpacity>
        <Text style={styles.text}>Tasks</Text>
        <Icon.Button 
          name = 'check-circle'
          color ='white'
          iconStyle= {styles.check}
          backgroundColor='#83ACB2'
          onPress={()=>navigation.navigate('Rest', {
            name: 'Michael',
            tasks:items,
            setTasks:setItems,
          })}
          />
      </SafeAreaView>
    </View>
  )
};

Header.defaultProps = {
    title: 'Current Tasks'
}

const styles = StyleSheet.create({
  container:{
    flex: 0.2
  },
  header:{
    flex:1,
    backgroundColor: '#83ACB2',
    flexDirection: 'row'
  },
  check:{
   marginTop:SCREEN_HEIGHT * 0.015,
   fontSize:30,
   width:30,
   height:30
  },
  text:{
    textAlign: "center",
    marginLeft: SCREEN_WIDTH * 0.30,
    marginTop: SCREEN_HEIGHT * 0.025,
    marginRight: SCREEN_WIDTH * 0.3,
    color:'white',
    fontSize: 25,
    fontFamily: 'GillSans-SemiBold',
  },
  ArrorImage: {
    marginLeft: SCREEN_WIDTH * 0.06,
    marginTop: SCREEN_HEIGHT * 0.03,
    width: 30,
    height: 20
  },
})

export default Header;