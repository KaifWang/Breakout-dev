import React from 'react';
import HomePage from './Pages/HomePage';
import ChooseModePage from './Pages/ChooseModePage';
import TaskPage from './Pages/TaskPage';
import TimerPage from './Pages/TimerPage';
import StatusReportPage from './Pages/StatusReportPage';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ title: 'Welcome' }}
      />
    <Stack.Screen name="Tasks" component={TaskPage} />
    <Stack.Screen name="Choose Mode" component={ChooseModePage} />
    <Stack.Screen name="Timer" component={TimerPage} />
    <Stack.Screen name="Status Report" component={StatusReportPage}/>
    </Stack.Navigator>
  );
}

export default Main;