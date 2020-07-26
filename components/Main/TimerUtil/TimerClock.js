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
import TimerPage from '../Pages/TimerPage';
import RestPage from '../Pages/RestPage';

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
      blocked: true,
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
    console.log('hello');
  };
  resumeWork = () => {
    this.rStop();
    this.wStart();
    this.setState({
      blocked: true,
    });
    console.log('bye');
  };
  stopWork = () => {
    this.wStop();
    this.rStart();
    this.setState({
      blocked: false,
    });
    console.log('Hi');
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
    return (
      <View>
        {this.state.blocked === false && (
          <View style={{height: '100%'}}>
            <RestPage
              navigation={this.props.navigation}
              Time={rTime}
              Resume={this.resumeWork}
            />
          </View>
        )}
        {this.state.blocked === true && (
          <View style={{height: '100%'}}>
            <TimerPage
              navigation={this.props.navigation}
              Time={wTime}
              Stop={this.stopWork}
              Start={this.sessionStart}
            />
          </View>
        )}
      </View>
    );
  }

  componentWillUnmount = () => {
    clearInterval(this.wTimer);
    clearInterval(this.rTimer);
    //clearInterval(this.myInterval);
    /*        {wTime === 0 && rTime === 0 && (
          <View style={{height: '100%'}}>
            <TimerPage
              navigation={this.props.navigation}
              Time={Timer(wTime)}
              Stop={() => this.sessionStart}
            />
          </View>
        )}*/
  };
}

export default TimerScreen;
