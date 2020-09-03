import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  TouchableHighlight,
  Button,
} from 'react-native';
import TimerClock from '../TimerUtil/TimerClock';
import {useFocusEffect} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {uuid} from 'uuidv4';
import Icon from 'react-native-vector-icons/Feather';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const RestPage = (props) => {
  const [WorkTime, setWorkTime] = useState(0);
  const [RestTime, setRestTime] = useState(0);
  const [PopUp, setPopUp] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [currentTask, setCurrentTask] = useState({id:1})
  const {tasks} = props.route.params;
  pickerTasks = [];
  j = 0
  for(i = 0; i < tasks.length; ++i){
    if(tasks[i].selected){
      pickerTasks[j] = {label: tasks[i].text, value: ++j}
    }
  }
  console.log(pickerTasks.length)

  //Wrap this in react.useEffect to change states in the previous screen
  //const {setTasks} = props.route.params;
  const TimerClockRef = useRef();

  const timerSave = (time) => {
    setRestTime(time);
  };
  const Pop = () => {
    setPopUp(true);
  };
  React.useEffect(() => {
    if (props.route.params?.workTime) {
      setWorkTime(props.route.params?.workTime);
      TimerClockRef.current.Update(RestTime);
      TimerClockRef.current.Start();

      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [props.route.params?.workTime]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        TimerClockRef.current.Stop();
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      {PopUp == false && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ImageBackground
            style={styles.PopUpImage}
            source={require('../../../images/PopUpBackground.png')}>
            <TouchableHighlight
              onPress={(() => setModalVisible(!modalVisible), Pop)}>
              <Image
                style={styles.PopUpButtonImage}
                source={require('../../../images/PopUpButton.png')}
              />
            </TouchableHighlight>
          </ImageBackground>
        </Modal>
      )}
      <Text style={styles.workTime}>work time</Text>
      <TimerClock Save={timerSave} Time={RestTime} ref={TimerClockRef} />
      <View style = {styles.horizontal}>
        <Text style={styles.workingOn}> working on:</Text>
        <DropDownPicker
          items={pickerTasks}
          defaultValue={currentTask.id}
          arrowColor='#83ACB2'
          arrowSize= {20}
          containerStyle={styles.pickerContainer}
          style={styles.picker}
          dropDownStyle={styles.dropDown}
          itemStyle={styles.item}
          labelStyle={styles.label}
          activeLabelStyle={styles.activeLabel}
          selectedLabelStyle={styles.selectedLabel}
          onChangeItem={item => setCurrentTask({
              id: item.value
          })}/>
      </View>
      <Image
          style={styles.image}
          source={require('../../../images/table.png')}>
      </Image>
      <Button
        title="Back to Work"
        onPress={() =>
          props.navigation.navigate('Timer', {
            workTime: WorkTime,
          })
        }
      />
      <Button
        title="End Session"
        onPress={() =>
          props.navigation.navigate('Status Report', {
            restTime: RestTime,
            workTime: WorkTime,
            name: props.route.params.name,
            tasks
          })
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#C8E0E1',
  },
  horizontal:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1
  },
  image: {
    resizeMode:'contain',
    width: (SCREEN_WIDTH * 60) / 100,
    height: (SCREEN_HEIGHT * 50) / 100,
  },
  workingOn: {
    fontFamily: 'GillSans-Light',
    fontSize: 20,
    color: '#83ACB2',
    paddingRight:(SCREEN_HEIGHT * 1) / 100
  },
  workTime:{
    fontFamily: 'GillSans-Light',
    fontSize: 20,
    color: '#83ACB2',
    paddingTop:(SCREEN_HEIGHT * 10) / 100,
  }, 
  label:{
    fontFamily: 'GillSans-Light',
    color: '#83ACB2',
    fontSize: 20,
  },
  item:{
    justifyContent:'flex-start',
  },
  activeLabel:{
    fontFamily: 'GillSans-Bold',
    color: '#83ACB2',
  },
  selectedLabel:{
    fontFamily: 'GillSans-Bold',
    color: '#83ACB2',
  },
  pickerContainer:{
    backgroundColor:'#C8E0E1',
    height: SCREEN_HEIGHT * 5 / 100,
    width: (SCREEN_WIDTH * 30) / 100,
  },
  picker:{
    backgroundColor:'#C8E0E1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dropDown:{
    color: '#83ACB2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20
  },
  PopUpImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    width: '100%',
  },
  PopUpButtonImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '45%',
    width: (SCREEN_HEIGHT * 40) / 100,
    height: (SCREEN_HEIGHT * 40) / 100,
  },
});

export default RestPage;
