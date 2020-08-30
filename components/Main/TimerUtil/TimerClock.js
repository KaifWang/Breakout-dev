import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import moment from 'moment';
import {notificationManager} from './NotificationManager';
import BackgroundFetch from 'react-native-background-fetch';

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
    this.localNotify = null;
  }

  componentDidMount() {
    this.localNotify = notificationManager;
    this.localNotify.configure();

    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // fetch interval in minutes
      },
      async (taskId) => {
        console.log('Received background-fetch event: ', taskId);
        this.sendNotification();

        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.error('RNBackgroundFetch failed to start.');
      },
    );
  }

  sendNotification = () => {
    const now = new Date().getTime();
    const duration = moment.duration(now - this.state.TimeStart);
    hours = duration.hours();
    minutes = duration.minutes();

    const options = {
      playSound: true,
      soundName: 'default',
      vibrate: true,
    };
    if (this.props.Type == 'Work' && (hours >= 1 || minutes > 50)) {
      //change this to make notification more frequent
      this.localNotify.showNotification(
        1,
        'Time to take a Break!',
        'you have studied for' +
          (hours < 1 ? ' ' : hours + ' hours and ') +
          minutes +
          'minutes.',
        {},
        options,
      );
    } else if (this.props.Type == 'Rest' && (hours >= 1 || minutes > 14)) {
      //every 15 minutes
      this.localNotify.showNotification(
        1,
        'Time to get back to work!',
        'you have rested for' +
          (hours < 1 ? ' ' : hours + ' hours and ') +
          minutes +
          'minutes.',
        {},
        options,
      );
    }
  };

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
      this.sendNotification();
    }, 15000);
  };

  Stop = () => {
    clearInterval(this.Timer);
    clearInterval(this.Saver);
    clearInterval(this.NotificationTimer);
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
