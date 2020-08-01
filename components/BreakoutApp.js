import React from 'react';
import Main from './Main/Main';
import Setting from './Setting/Setting';
import Community from './Community/Community';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// we use route to store state and data between differnt state
// this will return whether we are at 1st page of Main
function getTabBarVisible(route) {
  console.log(route);
  if(route.state && route.state.index > 0){
    return false;
  }else{
    return true;
  }
}

function BreakoutApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Main" 
        component={Main} 
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}/>
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BreakoutApp;
