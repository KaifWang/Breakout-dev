import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {uuid} from 'uuidv4';
import {Svg} from 'react-native-svg';

import PieChart from '../statusPageUtil/PieChart';

function getMin(time) {
  return time % 60;
}

function getHour(time) {
  return (time - (time % 60)) / 60;
}

const StatusReportPage = ({navigation, route}) => {
  const {tasks} = route.params;
  const Tasks = JSON.parse(tasks); //takes a JSON object and returns a javascript object use Task to reference the information

  const workTime = Math.round(
    ((route.params.workTime + 0.1) /
      (route.params.workTime + route.params.restTime + 0.1)) *
      100,
  );
  const restTime = Math.round(
    (route.params.restTime /
      (route.params.workTime + route.params.restTime + 0.1)) *
      100,
  );

  const [times, setTimes] = useState([
    {x: 'Working', y: workTime, focus: 1},
    {x: 'Resting', y: restTime, focus: 0},
  ]);

  const [time, setTime] = useState(times[0].y);

  const [word, setWord] = useState('Work Time:');

  const setFocusWork = (index) => {
    const tmp_times = [
      {x: 'Working', y: workTime, focus: 1},
      {x: 'Resting', y: restTime, focus: 0},
    ];
    let tmp_time = tmp_times[0].y;
    let tmp_word = 'Work Time:';
    if (index == 1) {
      tmp_times[1].focus = 1;
      tmp_times[0].focus = 0;
      tmp_time = tmp_times[1].y;
      tmp_word = 'Rest Time:';
    }
    setTimes(tmp_times);
    setTime(tmp_time);
    setWord(tmp_word);
    // console.log(times);
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '70%',
          alignSelf: 'flex-end',
          backgroundColor: '#FFFFFF',
        }}
      />
    );
  };
  console.log(Tasks);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Text
          style={styles.headerText}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          done
        </Text>
      </SafeAreaView>
      <FlatList
        style={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.part}>
              <Svg height={400} marginTop={50}>
                <View style={{alignItems: 'center', marginTop: '45%'}}>
                  <Text style={styles.greenText}>{word}</Text>
                  <Text style={styles.greenText}>{time}%</Text>
                </View>
                <PieChart times={times} setFocusWork={setFocusWork} />
              </Svg>
            </View>
            <View style={styles.seperator} />
            <View style={styles.part}>
              <Text style={styles.titleText}>Task time allocation</Text>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.text}>{Tasks.length}</Text>
                <Text style={styles.greenText}>
                  tasks completed during this session
                </Text>
              </View>
            </View>
          </View>
        }
        data={Tasks}
        contentContainerStyle={{flexDirection: 'column'}}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.listItemTextLeft}>{item.text}</Text>
            <Text style={styles.listItemTextRight}>
              {getHour(item.time)} hr {getMin(item.time)} min
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#CADEDF',
    marginBottom: 2,
    flexDirection: 'row',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'right',
    fontWeight: '600',
    fontFamily: 'Gill Sans',
    marginLeft: 320,
    marginBottom: 20,
  },
  list: {
    backgroundColor: '#CADEDF',
  },
  seperator: {
    backgroundColor: '#FFFFFF',
    height: 2,
  },
  part: {
    marginBottom: 2,
    backgroundColor: '#CADEDF',
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: 'Gill Sans',
    margin: 20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: 'Gill Sans',
  },
  greenText: {
    color: '#83ACB2',
    fontSize: 20,
    fontFamily: 'Gill Sans',
  },
  listItemTextLeft: {
    flex: 2,
    color: '#FFFFFF',
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 30,
    fontFamily: 'Gill Sans',
  },
  listItemTextRight: {
    flex: 1,
    textAlign: 'right',
    color: '#FFFFFF',
    fontSize: 20,
    marginVertical: 20,
    marginHorizontal: 30,
    fontFamily: 'Gill Sans',
  },
});

export default StatusReportPage;
