import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Button,
  TouchableHighlightBase,
} from 'react-native';
import moment from 'moment';
import Proximity from 'react-native-proximity';

function Timer({interval, studyType}) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const duration = moment.duration(interval);
  return (
    <View>
      <Text>{studyType}:</Text>
      <Text>{pad(duration.hours())}:</Text>
      <Text>{pad(duration.minutes())}:</Text>
      <Text>{pad(duration.seconds())},</Text>
    </View>
  );
}

class TimerScreen extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      workTimeStart: 0,
      workTimeCurrent: 0,
      workTimeSeconds: 0,
      restTimeStart: 0,
      restTimeCurrent: 0,
      restTimeSeconds: 0,
      blocked: false,
    };
  }

  wStart = () => {
    const now = new Date().getTime();
    this.setState({
      workTimeStart: now,
      workTimeCurrent: now,
    });
    this.wTimer = setInterval(() => {
      this.setState({workTimeCurrent: new Date().getTime()});
    }, 1000);
  };

  rStart = () => {
    const now = new Date().getTime();
    this.setState({
      restTimeStart: now,
      restTimeCurrent: now,
    });
    this.rTimer = setInterval(() => {
      this.setState({restTimeCurrent: new Date().getTime()});
    }, 1000);
  };

  reset = () => {
    clearInterval(this.wTimer);
    clearInterval(this.rTimer);
    this.setState({
      workTimeStart: 0,
      workTimeCurrent: 0,
      workTimeSeconds: 0,
      restTimeStart: 0,
      restTimeCurrent: 0,
      restTimeSeconds: 0,
      blocked: false,
    });
  };
  wStop = () => {
    const temp =
      this.state.workTimeCurrent -
      this.state.workTimeStart +
      this.state.workTimeSeconds;
    clearInterval(this.wTimer);
    this.setState({
      workTimeStart: 0,
      workTimeCurrent: 0,
      workTimeSeconds: temp,
    });
  };

  rStop = () => {
    const temp =
      this.state.restTimeCurrent -
      this.state.restTimeStart +
      this.state.restTimeSeconds;
    clearInterval(this.rTimer);
    this.setState({
      restTimeStart: 0,
      restTimeCurrent: 0,
      restTimeSeconds: temp,
    });
  };

  sessionStart = () => {
    this.wStart();
  };
  resumeWork = () => {
    this.rStop();
    this.wStart();
  };
  stopWork = () => {
    this.wStop();
    this.rStart();
  };
  render() {
    const wTime =
      this.state.workTimeSeconds +
      this.state.workTimeCurrent -
      this.state.workTimeStart;
    const rTime =
      this.state.restTimeSeconds +
      this.state.restTimeCurrent -
      this.state.restTimeStart;
    /*
    console.log('time:', wTime);
    console.log('workTimeSeconds:', this.state.workTimeSeconds);
    console.log('workTimeCurrent:', this.state.workTimeCurrent);
    console.log('workTimeStart:', this.state.workTimeStart);
    */
    if (this.state.blocked) {
      this.resumeWork;
    } else {
      this.stopWork;
    }
    return (
      <SafeAreaView>
        <Timer interval={wTime} studyType={'Work Time'} />
        <Timer interval={rTime} studyType={'Rest Time'} />
        {wTime === 0 && rTime === 0 && (
          <Button onPress={this.sessionStart} title="Start Session" />
        )}
        {this.state.workTimeCurrent === 0 && wTime != 0 && (
          <Button onPress={this.resumeWork} title="Resume" />
        )}
        {this.state.restTimeCurrent == 0 && wTime != 0 && (
          <Button onPress={this.stopWork} title="Stop" />
        )}
        {wTime != 0 && <Button onPress={this.reset} title="Reset" />}
      </SafeAreaView>
    );
  }
  componentDidMount = () => {
    Proximity.addListener(this._proximityListener);
  };
  /**
   * State of proximity sensor
   * @param {object} data
   */
  _proximityListener = (data) => {
    //I do not know why function calls do not work so I have to write all the code in the function overhere
    // console.log(data.proximity); // for testing purpose
    if (this.state.blocked != data.proximity && data.proximity === true) {
      const now = new Date().getTime();
      const temp =
        this.state.restTimeCurrent -
        this.state.restTimeStart +
        this.state.restTimeSeconds;
      clearInterval(this.rTimer);
      this.setState({
        workTimeStart: now,
        workTimeCurrent: now,
        restTimeStart: 0,
        restTimeCurrent: 0,
        restTimeSeconds: temp,
      });
      this.wTimer = setInterval(() => {
        this.setState({workTimeCurrent: new Date().getTime()});
      }, 1000);
    } else if (
      this.state.blocked != data.proximity &&
      data.proximity == false
    ) {
      const now = new Date().getTime();
      const temp =
        this.state.workTimeCurrent -
        this.state.workTimeStart +
        this.state.workTimeSeconds;
      clearInterval(this.wTimer);
      this.setState({
        restTimeStart: now,
        restTimeCurrent: now,
        workTimeStart: 0,
        workTimeCurrent: 0,
        workTimeSeconds: temp,
      });
      this.rTimer = setInterval(() => {
        this.setState({restTimeCurrent: new Date().getTime()});
      }, 1000);
    }
    this.setState({
      blocked: data.proximity,
    });
  };

  componentWillUnmount = () => {
    Proximity.removeListener(this._proximityListener);
    clearInterval(this.wTimer);
    clearInterval(this.rTimer);
    //clearInterval(this.myInterval);
  };
}

export default TimerScreen;
