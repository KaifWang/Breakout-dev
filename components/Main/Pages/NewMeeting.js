import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');


class NewMeeting extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
        SessionName: "Enter",
        Date: "dd / mm / yy",
        Time: "12:00   AM",
        Duration: "00 hr 00 min",
        Password: "Enter"
    };
  }


  render() {

    //return() is written orderly from the top to the bottom of this NewMeeting Page
    //By default we use vertical flexbox to arrage the screen.
    //However we also have some horizontal arraged flexbox like Date + today, Time + now, Duration + INF
    //All text fonts such as "Session Name", "Date", etc. are using the same stylesheet TextGeneral
    //For long textInput including the ones under "Session Name" and "Password" use stylesheet LongInput
    //For short textInput such as the ones under Time and Duration use stylesheet ShortInput
    //For all text inside a button such as TodayButton, NowButton, etc. we use stylesheet InsideButtonText
    //Colors: Red: #E3AB9C DarkYellow: #EFBE8D LightYellow: #FCDFBF Blue: #83ACB2

    //Solved Problem:
    //Problem 2: How to change the shape of the button into a trapezoid with border radius.
    //Problem 3: Detailed Fix according to the design page

    //Unsolved Problem:
    //Problem 1: How to change text in the textInput box by clicking the button.
    //Problem 4: Format the textInput correctly. As users filling in yymmdd, it turns to yy/mm/dd
    
    return (
        <View style={styles.container}>
            
            <SafeAreaView style={styles.topMargin}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}>
                    <Image
                    source={require('../../../images/Arrow.png')}
                    style={styles.ArrorImage}
                    >
                    </Image>
                </TouchableOpacity>
                <Text style={styles.NewMeeting}>New  Meeting</Text>
            </SafeAreaView>
            
            {/*Session Name*/}
            {/*Session Name textInput*/}
            <Text style={styles.TextGeneral}>Session Name</Text>
            <TextInput
                style={styles.LongInput}
                placeholder = {this.state.SessionName}
                placeholderTextColor = "#FCDFBF"
                onChangeText={(SessionName) => this.setState({ SessionName })}
                color = "#83ACB2"
            ></TextInput>

            {/*Date*/}
            {/*Date textInput*/}
            <View style={styles.HorizontalLayout}>
                <Text style={styles.TextGeneral}>Date</Text>
                <TouchableOpacity
                    style={styles.SetTimeButton}
                    onPress={() => {this.state.Date = "DD"}}>
                    <Text style={styles.InsideButtonText}>today</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.ShortInput}
                placeholder = {this.state.Date}
                placeholderTextColor = "#FCDFBF"
                onChangeText={(Date) => this.setState({ Date })}
                color = "#83ACB2"
            ></TextInput>

            {/*Time + nowButton + Duration + INFButton*/}
            {/*Time textInput + Duration textInput*/}
            <View style={styles.HorizontalLayout}>
                <Text style={styles.TextGeneral}>Time</Text>
                <TouchableOpacity
                    style={styles.SetTimeButton}
                    onPress={() => this.props.navigation.navigate('Tasks')}>
                    <Text style={styles.InsideButtonText}>now</Text>
                </TouchableOpacity>
                <Text style={styles.TextGeneral}>Duration</Text>
                <TouchableOpacity
                    style={styles.INFButton}
                    onPress={() => this.props.navigation.navigate('Tasks')}>
                    <Text style={styles.InsideButtonText}>∞</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.HorizontalLayout}>
                <TextInput
                    style={styles.ShortInput}
                    placeholder = {this.state.Time}
                    placeholderTextColor = "#FCDFBF"
                    onChangeText={(Time) => this.setState({ Time })}
                    color = "#83ACB2"
                ></TextInput>
                <TextInput
                    style={styles.ShortInput}
                    placeholder = {this.state.Duration}
                    placeholderTextColor = "#FCDFBF"
                    onChangeText={(Duration) => this.setState({ Duration })}
                    color = "#83ACB2"
                ></TextInput>
            </View>

            {/*Privacy*/}
            {/*Privacy/Public Button*/}
            <Text style={styles.TextGeneral}>Privacy</Text>
            <View style={styles.HorizontalLayout}>
                <View
                    style={styles.PrivateButtonTrapezoid}
                    onPress={() => this.props.navigation.navigate('Tasks')}>
                <Text style={styles.PrivateButtonText}>Private</Text>
                </View>
                <TouchableOpacity
                    style={styles.PublicButtonTrapezoid}
                    onPress={() => this.props.navigation.navigate('Tasks')}>
                <Text style={styles.PublicButtonText}>Public</Text>
                </TouchableOpacity>
            </View>

            {/*Password*/}
            {/*Password textInput*/}
            <Text style={styles.TextGeneral}>Password</Text>
            <TextInput
                style={styles.LongInput}
                placeholder = {this.state.Password}
                placeholderTextColor = "#FCDFBF"
                onChangeText={(Password) => this.setState({ Password })}
                color = "#83ACB2"
            ></TextInput>        

            {/*Complete Button*/}
            <TouchableOpacity
                style={styles.CompleteButton}
                onPress={() => this.props.navigation.navigate('Tasks')}>
               <Text style={styles.CompleteButtonText}>Complete</Text>
            </TouchableOpacity>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMargin: {
    flex: 0.4,
    backgroundColor: '#83ACB2',
    flexDirection: 'row'
  },
  ArrorImage: {
    marginLeft: SCREEN_WIDTH * 0.06,
    marginTop: SCREEN_HEIGHT * 0.025,
    width: 104 / 3,
    height: 67 / 3,
  },
  NewMeeting: {
    textAlign: "center",
    marginLeft: SCREEN_WIDTH * 0.20,
    marginTop: SCREEN_HEIGHT * 0.025,
    color:'white',
    fontSize: 25,
    fontFamily: 'GillSans-SemiBold',
  },
  TextGeneral: {
    marginLeft: SCREEN_WIDTH * 0.12,
    marginTop:SCREEN_HEIGHT * 0.02,
    color:'#83ACB2',
    fontSize: 25,
    fontFamily: 'GillSans-SemiBold',
  },
  LongInput: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.05,
    marginTop: SCREEN_HEIGHT * 0.02,
    marginLeft: SCREEN_WIDTH * 0.1,
    marginBottom: SCREEN_HEIGHT * 0.02,
    borderColor: '#83ACB2',
    borderWidth: 1.5,
    borderRadius: 13,
    fontSize: 25,
    fontFamily: 'GillSans-Light',
    paddingLeft: 10,
  },
  HorizontalLayout: {
    flexDirection: 'row'
  },
  SetTimeButton: {
    justifyContent: "center",
    textAlign: 'center',
    marginLeft: SCREEN_WIDTH * 0.03,
    marginTop:SCREEN_HEIGHT * 0.02,
    width: SCREEN_WIDTH * 0.17,
    height: SCREEN_HEIGHT * 0.03,
    backgroundColor:"#EFBE8D",
    borderRadius:100,
  },
  INFButton: {
    justifyContent: "center",
    textAlign: 'center',
    marginLeft: SCREEN_WIDTH * 0.03,
    marginTop:SCREEN_HEIGHT * 0.02,
    width: SCREEN_WIDTH * 0.09,
    height: SCREEN_HEIGHT * 0.03,
    backgroundColor:"#EFBE8D",
    borderRadius:100,
  },
  InsideButtonText: {
    paddingBottom: 30,
    textAlign: 'center',
    color:'#fff',
    fontSize: 25,
    fontFamily: 'GillSans-Light',
  },
  ShortInput: {
    textAlign:"center",
    width: SCREEN_WIDTH * 0.365,
    height: SCREEN_HEIGHT * 0.05,
    marginTop: SCREEN_HEIGHT * 0.01,
    marginLeft: SCREEN_WIDTH * 0.1,
    marginBottom: SCREEN_HEIGHT * 0.01,
    borderColor: '#83ACB2',
    borderWidth: 2,
    borderRadius: 13,
    fontSize: 25,
    fontFamily: 'GillSans-Light',
    paddingLeft: 10,
  },
  PrivateButtonTrapezoid: {
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.1,
    marginTop: SCREEN_HEIGHT * 0.02,
    marginBottom: SCREEN_HEIGHT * 0.01,
    width: SCREEN_WIDTH * 0.25,
    height:0,
    borderTopWidth: 40,
    borderTopColor: "#EFBE8D",
    borderLeftWidth: 0,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  PrivateButtonText: {
    marginTop: -SCREEN_WIDTH * 0.1,
    textAlign: 'center',
    color:'#fff',
    fontSize: 25,
    fontFamily: 'GillSans-Light',
  },
  //I don't know why this works
  //DO NOT MODIFY
  PublicButtonTrapezoid: {
    justifyContent: "center",
    marginLeft: -8,
    marginTop: SCREEN_HEIGHT * 0.02,
    marginBottom: SCREEN_HEIGHT * 0.01,
    width: SCREEN_WIDTH * 0.25,
    height: 0,
    borderBottomWidth: 40,
    borderBottomColor: "#FCDFBF",
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 0,
    borderRightColor: 'transparent',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  PublicButtonText: {
    marginBottom: -SCREEN_WIDTH * 0.1,
    textAlign: 'center',
    color:'#fff',
    fontSize: 25,
    fontFamily: 'GillSans-Light',
  },
  CompleteButton: {
    justifyContent: "center",
    marginTop: SCREEN_HEIGHT * 0.06,
    marginLeft: SCREEN_WIDTH * 0.6,
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.05,
    backgroundColor:"#E3AB9C",
    borderRadius:10,
  },
  CompleteButtonText: {
    textAlign: 'center',
    color:'#fff',
    fontSize: 25,
    fontFamily: 'GillSans-SemiBold',
  },
});

export default NewMeeting;
