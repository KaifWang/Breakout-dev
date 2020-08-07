import React from 'react';
import StartSessionPage from './Pages/StartSessionPage';
import ChooseModePage from './Pages/ChooseModePage';
import TaskPage from './Pages/TaskPage';
import TimerPage from './Pages/TimerPage';
import RestPage from './Pages/RestPage';
import NewMeeting from './Pages/NewMeeting';
import StatusReportPage from './Pages/StatusReportPage';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={StartSessionPage} />
      <Stack.Screen name="NewMeeting" component={NewMeeting} />
      <Stack.Screen name="Tasks" component={TaskPage} />
      <Stack.Screen name = "Rest" component= {RestPage} />
      <Stack.Screen name="Timer" component={TimerPage} />
      <Stack.Screen name="Status Report" component={StatusReportPage} />
    </Stack.Navigator>
  );
};

export default Main;
