import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import moment from 'moment';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

function TimerDisplay({interval}) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const duration = moment.duration(interval);

  return (
    <Text style={styles.time}>
      {pad(duration.hours()) + ':' + pad(duration.minutes())}
    </Text>
  );
}

class TimerClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TimeStart: 0,
      TimeCurrent: 0,
      TimeSeconds: this.props.Time,
      blocked: true,
    };
    this.Stop = this.Stop.bind(this);
    this.Start = this.Start.bind(this);
    this.Update = this.Update.bind(this);
  }

  Update = (time) => {
    this.setState({
      TimeSeconds: time,
    });
  };

  Start = () => {
    const now = new Date().getTime();
    this.setState({
      TimeStart: now,
      TimeCurrent: now,
    });
    this.Timer = setInterval(() => {
      this.setState({TimeCurrent: new Date().getTime()});
    }, 1000);

    this.Saver = setInterval(() => {
      const temp =
        this.state.TimeCurrent - this.state.TimeStart + this.state.TimeSeconds;
      this.props.Save(temp);
    }, 30000);
  };

  Stop = () => {
    clearInterval(this.Timer);
    clearInterval(this.Saver);
  };

  render() {
    const Time =
      this.state.TimeSeconds + this.state.TimeCurrent - this.state.TimeStart;
    return (
      <View>
        <TimerDisplay interval={Time} />
      </View>
    );
  }

  componentWillUnmount = () => {
    clearInterval(this.Timer);
    this.props.Save(
      this.state.TimeSeconds + this.state.TimeCurrent - this.state.TimeStart,
    );

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

const styles = StyleSheet.create({
  time: {
    fontFamily: 'GillSans-Light',
    fontSize: 80,
    color: '#83ACB2',
    paddingBottom: SCREEN_HEIGHT * 5 / 100
  },
});
export default TimerClock;
