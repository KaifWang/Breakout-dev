import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import HomePage from './components/Screens/HomePage'
import ChooseMode from './components/Screens/ChooseMode' 
import TaskPage from './components/Screens/TaskPage';
import Timer from './components/Screens/Timer';
import StatusReport from './components/Screens/StatusReport';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function IamBreakOut(){
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
       I am Break Out
      </Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Welcome' }}
        />
      <Stack.Screen name="I am" component={IamBreakOut} />
      <Stack.Screen name="Tasks" component={TaskPage} />
      <Stack.Screen name="Choose Mode" component={ChooseMode} />
      <Stack.Screen name="Timer" component={Timer} />
      <Stack.Screen name="Status Report" component={StatusReport}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;