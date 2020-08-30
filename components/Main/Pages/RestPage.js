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
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const RestPage = (props) => {
  const [WorkTime, setWorkTime] = useState(0);
  const [RestTime, setRestTime] = useState(0);
  const [PopUp, setPopUp] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [currentTask, setCurrentTask] = useState({id: 1});
  const {tasks} = props.route.params;
  const [Tasks, setTasks] = useState(JSON.parse(tasks)); //takes a JSON object and returns a javascript object

  const pickerTasks = [];
  for (i = 0; i < Tasks.length; ++i) {
    pickerTasks[i] = {label: Tasks[i].text, value: i};
  }
  //Wrap this in react.useEffect to change states in the previous screen
  //const {setTasks} = props.route.params;
  const TimerClockRef = useRef();

  const timerSave = (time) => {
    setRestTime(time);
  };
  const Pop = () => {
    setPopUp(true);
  };

  const showMenu = () => {
    console.log('showing menu');
  };
  const updateTask = (recentworktime) => {
    var tempTask = Tasks;
    tempTask[currentTask.id].time += MinuteConvert(recentworktime - WorkTime);
    setTasks(tempTask);
  };
  React.useEffect(() => {
    if (props.route.params?.workTime) {
      updateTask(props.route.params.workTime);
      console.log('on:', Tasks);
      setWorkTime(props.route.params.workTime);
      TimerClockRef.current.Update(RestTime);
      TimerClockRef.current.Start();

      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [props.route.params?.workTime]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Task:', Tasks);

      return () => {
        TimerClockRef.current.Stop();
        console.log('leaving', Tasks);
      };
    }, []),
  );
  function MinuteConvert(interval) {
    const duration = moment.duration(interval);
    return duration.hours() * 60 + duration.minutes();
  }
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Icon.Button
          name="navicon"
          size={(SCREEN_WIDTH * SCREEN_HEIGHT) / 9000}
          backgroundColor="#C8E0E1"
          onPress={() => {
            setModalVisible2(!modalVisible2);
          }}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        backdropOpacity={0.5}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{flex: 1}}>
          <View style={styles.arrow}>
            <Icon.Button
              name="arrow-left"
              size={(SCREEN_WIDTH * SCREEN_HEIGHT) / 9000}
              backgroundColor="#FFFFFF"
              onPress={() => {
                setModalVisible2(!modalVisible2);
              }}
            />
          </View>
          <View>
            <Text style={styles.workTime}>work time</Text>
          </View>
        </View>
      </Modal>

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
      <View style={styles.horizontal}>
        <Text style={styles.workingOn}> working on:</Text>
        <DropDownPicker
          items={pickerTasks}
          defaultValue={currentTask.id}
          arrowColor="#83ACB2"
          arrowSize={20}
          containerStyle={styles.pickerContainer}
          style={styles.picker}
          dropDownStyle={styles.dropDown}
          itemStyle={styles.item}
          labelStyle={styles.label}
          activeLabelStyle={styles.activeLabel}
          selectedLabelStyle={styles.selectedLabel}
          onChangeItem={(item) =>
            setCurrentTask({
              id: item.value,
            })
          }
        />
      </View>
      <Image
        style={styles.image}
        source={require('../../../images/table.png')}></Image>
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
            restTime: MinuteConvert(RestTime),
            workTime: MinuteConvert(WorkTime),
            name: props.route.params.name,
            tasks: JSON.stringify(Tasks), //converting javascript object into JSON string
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
    backgroundColor: '#C8E0E1',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  menu: {
    marginLeft: SCREEN_WIDTH / 1.25,
    marginTop: SCREEN_HEIGHT / 15,
  },
  arrow: {
    marginRight: SCREEN_WIDTH / 1.3,
    marginTop: SCREEN_HEIGHT / 15,
  },
  image: {
    resizeMode: 'contain',
    width: (SCREEN_WIDTH * 60) / 100,
    height: (SCREEN_HEIGHT * 50) / 100,
  },
  workingOn: {
    fontFamily: 'GillSans-Light',
    fontSize: 20,
    color: '#83ACB2',
    paddingRight: (SCREEN_HEIGHT * 1) / 100,
  },
  workTime: {
    fontFamily: 'GillSans-Light',
    fontSize: 20,
    color: '#83ACB2',
    paddingTop: SCREEN_HEIGHT / 250,
  },
  label: {
    fontFamily: 'GillSans-Light',
    color: '#83ACB2',
    fontSize: 20,
  },
  item: {
    justifyContent: 'flex-start',
  },
  activeLabel: {
    fontFamily: 'GillSans-Bold',
    color: '#83ACB2',
  },
  selectedLabel: {
    fontFamily: 'GillSans-Bold',
    color: '#83ACB2',
  },
  pickerContainer: {
    backgroundColor: '#C8E0E1',
    height: (SCREEN_HEIGHT * 5) / 100,
    width: (SCREEN_WIDTH * 30) / 100,
  },
  picker: {
    backgroundColor: '#C8E0E1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dropDown: {
    color: '#83ACB2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
