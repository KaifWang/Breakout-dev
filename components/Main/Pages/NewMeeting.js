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
import DateTimePicker from '@react-native-community/datetimepicker';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

//Colors: Red: #E3AB9C DarkYellow: #EFBE8D LightYellow: #FCDFBF Blue: #83ACB2 BackgroundWhite: #????

class NewMeeting extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      SessionNamePlaceHolder: "Enter",
      SessionNameInputColor: "#FCDFBF",
      SessionNameValue: "",

      TodayDate: new Date(),
      DatePlaceHolder: "dd/mm/yyyy",
      DateInputColor: "#FCDFBF",
      DateButtonColor: "#FCDFBF",
      DateValue: "",
      DatePickerValue: "",
      DatePickerVisible: false,

      TimePlaceHolder: "12:00   AM",
      TimeInputColor: "#FCDFBF",
      TimeButtonColor: "#FCDFBF",
      TimeValue: "",
      TimePickerValue: "",
      TimePickerVisible: false,

      DurationPlaceHolder: "00 hr 00 min",
      DurationInputColor: "#FCDFBF",
      DurationButtonColor: "#FCDFBF",
      DurationValue: "",

      PrivateButton: "#EFBE8D",
      PublicButton: "#FCDFBF",

      PasswordPlaceHolder: "Enter",
      PasswordValue: "",
      PasswordInputColor: "#FCDFBF",
      PasswordEditable: true,
      PasswordInputBGColor: "#F2F2F2"
    };
  }

  //Functions: Used mainly for users feedback.
  //Feedback includes:
  // 1. ALL TextInput changes its color from yellow to blue when typing.
  // 2. "today" button, "now" button, "∞" button changes from light yellow to dark yellow when clicking.
  // 3. Switch focus between "Private"/"Public" button.
  // 4. After clicking "Public" button, it changes to dark yellow and the Password TextInput is disabled.

  
  // The code below is commented because we don't use Date as TextInput. We don't need to structure the input
  // We change it to Picker.

  // DateOnChangeText = DateValue => {
  //   DateValue = this.convertDateNumber(DateValue);
  //   DateValue = this.DateFormat(DateValue);
  //   if(DateValue == ""){
  //     this.setState({DatePlaceHolder: "dd / mm / yy"});
  //     this.setState({DateInputColor: "#FCDFBF"});
  //   } else {
  //     this.setState({DatePlaceHolder: ""});
  //     this.setState({DateInputColor: "#83ACB2"});
  //   }
  //   this.setState({DateValue: DateValue});
  //   this.setState({DateButtonColor: "#FCDFBF"});
  // }
  // convertDateNumber = (Value) => {
  //   var newValue = "";
  //   for (let i = 0; i < Value.length; ++i) {
  //     //To prevent adding more '/' into our string, we check if it is a '/' first
  //     if ((Value.charAt(i) <= '9' && Value.charAt(i) >= '0') || Value.charAt(i) == '/') {
  //       newValue += Value.charAt(i);
  //     }
  //   }
  //   return newValue;
  // }
  // DateFormat = (DateValue) => {
  //   var newDateValue = "";
  //   for(let i = 0; i < DateValue.length; ++i){
  //     if((i == 2 || i == 5) && DateValue.charAt(i) != '/'){newDateValue += '/';}
  //     newDateValue += DateValue.charAt(i);
  //   }
  //   newDateValue = newDateValue.substring(0, 10);
  //   return newDateValue;
  // }
  // TimeOnChangeText = TimeValue => {
  //   TimeValue = this.convertTimeNumber(TimeValue);
  //   TimeValue = this.TimeFormat(TimeValue);
  //   if(TimeValue == ""){
  //     this.setState({TimePlaceHolder: "12: 00 AM"});
  //     this.setState({TimeInputColor: "#FCDFBF"});
  //   } else {
  //     this.setState({TimePlaceHolder: ""});
  //     this.setState({TimeInputColor: "#83ACB2"});
  //   }
  //   this.setState({TimeValue: TimeValue});
  //   this.setState({TimeButtonColor: "#FCDFBF"});
  // }
  // convertTimeNumber = (Value) => {
  //   var newValue = "";
  //   for (let i = 0; i < Value.length; ++i) {
      
  //     if ((Value.charAt(i) <= '9' && Value.charAt(i) >= '0') || Value.charAt(i) == ':') {
  //       newValue += Value.charAt(i);
  //     }
  //   }
  //   return newValue;
  // }
  // TimeFormat = (TimeValue) => {//This function will be changed later because AM / PM will not be input manually by users
  //   var newTimeValue = "";
  //   for(let i = 0; i < TimeValue.length; ++i){
  //     if(i == 2 && TimeValue.charAt(i) != ':'){newTimeValue += ':';}
  //     newTimeValue += TimeValue.charAt(i);
  //   }
  //   return newTimeValue;
  // }

  //FUNCTIONS:

  // Date TextInput Related Functions
  DateOnFocus = () => {//When TextInput is OnFocus
    this.setState({DatePickerVisible: true});
  }
  DateOnBlur = () => {//When TextInut is not OnFocus
    this.setState({DatePickerVisible: false});
  }
  setDatePicker = () => {//The Save Button onPress after picker shows up
    if(this.state.DatePickerValue != ""){
      this.setState({DateValue: this.state.DatePickerValue});
      this.setState({DateButtonColor: "#FCDFBF"});
    } else {
      this.setDateToday();
    }
    this.setState({DatePickerVisible: false});
    this.setState({DateInputColor: "#83ACB2"});
    this.refs.DateInput.blur()
  }
  DatePickerClose = () => {//The Close Button OnPres after picker shows up
    this.setState({DatePickerVisible: false});
    this.refs.DateInput.blur()
  }
  setDateToday = () => {//Set the Date as Today's Date. Used when picker selected nothing or pressing the Today button
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var value = "";
    if(month < 10){value = "0" + month + '/';}
    else{value = month + '/';}
    if(date < 10){value = value + "0" + date + '/';}
    else{value = value + date + '/';}
    value += year;
    this.setState({
      DateValue: value,
      DateInputColor: "#83ACB2",
      DateButtonColor: "#EFBE8D",
    });
    this.refs.DateInput.blur()
  }
  DateOnChange = (event, selectedDate) => {//When Picker changes, this function records the change
    var date = selectedDate.getDate();
    var month = selectedDate.getMonth() + 1;
    var year = selectedDate.getFullYear();
    var value = "";
    if(month < 10){value = "0" + month + '/';}
    else{value = month + '/';}
    if(date < 10){value = value + "0" + date + '/';}
    else{value = value + date + '/';}
    value += year;
    this.setState({DatePickerValue: value});
  };

  // Time TextInput Related Functions
  TimeOnFocus = () => {
    this.setState({TimePickerVisible: true});
  }
  TimeOnBlur = () => {
    this.setState({TimePickerVisible: false});
  }
  setTimePicker = () => {//The Save Button onPress after picker shows up
    if(this.state.TimePickerValue != ""){
      this.setState({TimeValue: this.state.TimePickerValue});
      this.setState({TimeButtonColor: "#FCDFBF"});
    } else {
      this.setTimeNow();
    }
    this.setState({TimePickerVisible: false});
    this.setState({TimeInputColor: "#83ACB2"});
    this.refs.TimeInput.blur()
  }
  TimePickerClose = () => {//The Close Button OnPres after picker shows up
    this.setState({TimePickerValue: false});
    this.refs.TimeInput.blur()
  }
  setTimeNow = () => {//Set the time as time right now. Used when picker selected nothing or pressing the Now button
    var hours = new Date().getHours();
    var min  = new Date().getMinutes();
    var AMorPM = "  AM";
    if(hours > 12){
      hours = hours - 12;
      AMorPM = "  PM";
    }
    var time = "";
    if(hours < 10){time = "0" + hours + ":";}
    else{time = hours + ":";}
    if(min < 10){time += "0" + min;}
    else{time += min;}
    this.setState({
      TimeValue: time + AMorPM,
      TimeInputColor: "#83ACB2",
      TimeButtonColor: "#EFBE8D",
    });
    this.refs.TimeInput.blur()
  }
  TimeOnChange = (event, selectedTime) => {//Record the change of the Time Picker
    var hours = selectedTime.getHours();
    var min  = selectedTime.getMinutes();
    var AMorPM = "  AM";
    if(hours > 12){
      hours -= 12;
      AMorPM = "  PM";
    }
    var time = "";
    if(hours < 10){time = "0" + hours + ":";}
    else{time = hours + ":";}
    if(min < 10){time += "0" + min;}
    else{time += min;}
    this.setState({TimePickerValue: time + AMorPM});
  };

  setDurationINF = () => {
    this.setState({
      DurationValue: "∞",
      DurationInputColor: "#83ACB2",
      DurationButtonColor: "#EFBE8D",
    });
  }


  onFocusPrivate = () => {
    this.setState({PublicButton: "#FCDFBF"});
    this.setState({PrivateButton: "#EFBE8D"});
    this.setState({PasswordEditable: true});
    this.setState({PasswordInputBGColor: "#F2F2F2"});
    this.setState({PasswordPlaceHolder: "Enter"});
  }
  onFocusPublic = () => {
    this.setState({PublicButton: "#EFBE8D"});
    this.setState({PrivateButton: "#FCDFBF"});
    this.setState({PasswordEditable: false});
    this.setState({PasswordInputBGColor: "#83ACB2"});
    this.setState({PasswordPlaceHolder: ""});
    this.setState({PasswordValue: ""});
    this.setState({PasswordInputColor: "#FCDFBF"});
  }


  //onChangeText Functions: triggered by any changes in TextInput boxes
  SessionNameOnChangeText = SessionNameValue => {
    if(SessionNameValue == ""){
      this.setState({SessionNamePlaceHolder: "Enter"});
      this.setState({SessionNameInputColor: "#FCDFBF"});
    } else {
      this.setState({SessionNamePlaceHolder: ""});
      this.setState({SessionNameInputColor: "#83ACB2"});
    }
    this.setState({SessionNameValue: SessionNameValue});
  }


  DurationOnChangeText = DurationValue => {
    DurationValue = this.convertNumber(DurationValue);
    if(DurationValue == ""){
      this.setState({DurationPlaceHolder: "00 hr 00 min"});
      this.setState({DurationInputColor: "#FCDFBF"});
    } else {
      this.setState({DurationPlaceHolder: ""});
      this.setState({DurationInputColor: "#83ACB2"});
    }
    this.setState({DurationValue: DurationValue});
    this.setState({DurationButtonColor: "#FCDFBF"});
  }
  PasswordOnChangeText = PasswordValue => {
    this.setState({PasswordValue: PasswordValue});
    if(PasswordValue == ""){
      this.setState({PasswordPlaceHolder: "Enter"});
      this.setState({PasswordInputColor: "#FCDFBF"});
    } else {
      this.setState({PasswordPlaceHolder: ""});
      this.setState({PasswordInputColor: "#83ACB2"});
    }
  }

  render() {

    //return() is written orderly from the top to the bottom of this NewMeeting Page
    //By default we use vertical flexbox to arrage the screen.
    //However we also have some horizontal arraged flexbox like Date + today, Time + now, Duration + INF
    //Stylesheets usage is commented below before const styles

    //Solved Problem:
    //Problem 1: How to change text in the textInput box by clicking the button.
    //Problem 2: How to change the shape of the button into a trapezoid with border radius.
    //Problem 3: Detailed Fix according to the design page
    //Problem 5: Correct Users' feedback: Button's color change, TextInput color change... Details are written above below Functions.
    //Problem 4: Format the textInput correctly. As users filling in yymmdd, it turns to yy/mm/dd
    //Problem 6: For some textInput, only numerical inputs are allowed.
    
    return (
        <View style={styles.container}>
            
            <SafeAreaView style={styles.topMargin}>
            {!(this.state.DatePickerVisible||this.state.TimePickerVisible) && (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}>
                    <Image
                    source={require('../../../images/Arrow.png')}
                    style={styles.ArrorImage}
                    >
                    </Image>
                </TouchableOpacity>)}
                <Text style={styles.NewMeeting}>New  Meeting</Text>
            </SafeAreaView>
            
            {/*Session Name*/}
            {/*Session Name textInput*/}
            <Text style={styles.TextGeneral}>Session Name</Text>
            <TextInput
                style={styles.LongInput}
                placeholder = {this.state.SessionNamePlaceHolder}
                value  = {this.state.SessionNameValue}
                placeholderTextColor = {this.state.SessionNameInputColor}
                onChangeText={this.SessionNameOnChangeText}
                color = {this.state.SessionNameInputColor}
            ></TextInput>

            {/*Date*/}
            {/*Date textInput*/}
            <View style={styles.HorizontalLayout}>
                <Text style={styles.TextGeneral}>Date</Text>
                <TouchableOpacity
                    style={[styles.SetTimeButton,{backgroundColor: this.state.DateButtonColor}]}
                    onPress={this.setDateToday}>
                    <Text style={styles.InsideButtonText}>today</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.ShortInput}
                placeholder={this.state.DatePlaceHolder}
                value={this.state.DateValue}
                placeholderTextColor = {this.state.DateInputColor}
                onFocus={this.DateOnFocus}
                onBlur={this.DateOnBlur}
                color={this.state.DateInputColor}
                ref="DateInput"
            ></TextInput>

            {/*Time + nowButton + Duration + INFButton*/}
            {/*Time textInput + Duration textInput*/}
            <View style={styles.HorizontalLayout}>
                <Text style={styles.TextGeneral}>Time</Text>
                <TouchableOpacity
                    style={[styles.SetTimeButton,{backgroundColor: this.state.TimeButtonColor}]}
                    onPress={this.setTimeNow}>
                    <Text style={styles.InsideButtonText}>now</Text>
                </TouchableOpacity>
                <Text style={styles.TextGeneral}>Duration</Text>
                <TouchableOpacity
                    style={[styles.INFButton,{backgroundColor: this.state.DurationButtonColor}]}
                    onPress={this.setDurationINF}>
                    <Text style={styles.InsideButtonText}>∞</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.HorizontalLayout}>
                <TextInput
                    style={styles.ShortInput}
                    placeholder = {this.state.TimePlaceHolder}
                    placeholderTextColor = {this.state.TimeInputColor}
                    value = {this.state.TimeValue}
                    color = {this.state.TimeInputColor}
                    onFocus={this.TimeOnFocus}
                    onBlur={this.TimeOnBlur}
                    ref="TimeInput"
                ></TextInput>
                <TextInput
                    style={styles.ShortInput}
                    placeholder = {this.state.DurationPlaceHolder}
                    placeholderTextColor = {this.state.DurationInputColor}
                    value = {this.state.DurationValue}
                    onChangeText={this.DurationOnChangeText}
                    color = {this.state.DurationInputColor}
                ></TextInput>
            </View>

            {/*Privacy*/}
            {/*Privacy/Public Button*/}
            <Text style={styles.TextGeneral}>Privacy</Text>
            <View style={styles.HorizontalLayout}>
                <TouchableOpacity
                    style={[styles.PrivateButtonTrapezoid,{borderTopColor: this.state.PrivateButton}]}
                    onPress={this.onFocusPrivate}>
                <Text style={styles.PrivateButtonText}>Private</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.PublicButtonTrapezoid,{borderBottomColor: this.state.PublicButton}]}
                    onPress={this.onFocusPublic}>
                <Text style={styles.PublicButtonText}>Public</Text>
                </TouchableOpacity>
            </View>

            {/*Password*/}
            {/*Password textInput*/}
            <Text style={styles.TextGeneral}>Password</Text>
            <TextInput
                style={styles.LongInput}
                placeholder = {this.state.PasswordPlaceHolder}
                placeholderTextColor = {this.state.PasswordInputColor}
                value = {this.state.PasswordValue}
                onChangeText={this.PasswordOnChangeText}
                color = {this.state.PasswordInputColor}
                editable = {this.state.PasswordEditable}
                backgroundColor = {this.state.PasswordInputBGColor}
            ></TextInput>        

            {/*Complete Button*/}
            {!(this.state.DatePickerVisible||this.state.TimePickerVisible) && (
                <TouchableOpacity
                style={styles.CompleteButton}
                onPress={() => this.props.navigation.navigate('Tasks')}>
              <Text style={styles.CompleteButtonText}>Complete</Text>
            </TouchableOpacity>
            )}
            {this.state.DatePickerVisible && (
              <View>
                <View style={styles.HorizontalLayout}>
                  <TouchableOpacity
                      style={styles.SaveButton}
                      onPress={this.setDatePicker}>
                  <Text style={styles.InsideButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.CloseButton}
                      onPress={this.DatePickerClose}>
                  <Text style={styles.InsideButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.TodayDate}
                  mode={"date"}
                  display="default"
                  onChange={this.DateOnChange}
                />
              </View>
            )}
            {this.state.TimePickerVisible && (
              <View>
                <View style={styles.HorizontalLayout}>
                  <TouchableOpacity
                      style={styles.SaveButton}
                      onPress={this.setTimePicker}>
                  <Text style={styles.InsideButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.CloseButton}
                      onPress={this.TimePickerClose}>
                  <Text style={styles.InsideButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={this.state.TodayDate}
                  mode={"time"}
                  display="default"
                  onChange={this.TimeOnChange}
                />
              </View>
            )}
        </View>
    );
  }
}
//All text fonts such as "Session Name", "Date", etc. are using the same stylesheet TextGeneral
//For long textInput including the ones under "Session Name" and "Password" use stylesheet LongInput
//For short textInput such as the ones under Time and Duration use stylesheet ShortInput
//For text inside TodayButton and NowButton, we use stylesheet InsideButtonText
//The Private/Public Button, INFButton and Complete Button have their own stylesheets.
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
    borderRadius:100,
  },
  INFButton: {
    justifyContent: "center",
    textAlign: 'center',
    marginLeft: SCREEN_WIDTH * 0.03,
    marginTop:SCREEN_HEIGHT * 0.02,
    width: SCREEN_WIDTH * 0.09,
    height: SCREEN_HEIGHT * 0.03,
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
  },
  //I don't know why this works
  //DO NOT MODIFY
  PrivateButtonTrapezoid: {
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.1,
    marginTop: SCREEN_HEIGHT * 0.02,
    marginBottom: SCREEN_HEIGHT * 0.01,
    width: SCREEN_WIDTH * 0.25,
    height:0,
    borderTopWidth: 40,
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
  PublicButtonTrapezoid: {
    justifyContent: "center",
    marginLeft: -8,
    marginTop: SCREEN_HEIGHT * 0.02,
    marginBottom: SCREEN_HEIGHT * 0.01,
    width: SCREEN_WIDTH * 0.25,
    height: 0,
    borderBottomWidth: 40,
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
    marginLeft: SCREEN_WIDTH * 0.55,
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
  SaveButton: {
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.35,
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.03,
    backgroundColor:"#83ACB2",
    borderRadius:10,
  },
  CloseButton: {
    justifyContent: "center",
    marginLeft: SCREEN_WIDTH * 0.05,
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.03,
    backgroundColor:"#E3AB9C",
    borderRadius:10,
  },
});

export default NewMeeting;
