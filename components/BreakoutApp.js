import React from 'react';
import Main from './Main/Main';
import Setting from './Setting/Setting';
import Community from './Community/Community';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from "react-native";

const Tab = createBottomTabNavigator();

// we use route to store state and data between differnt state
// this will return whether we are at 1st page of Main
function getTabBarVisible(route) {
  if(route.state && route.state.index > 0){
    return false;
  }else{
    return true;
  }
}

function BreakoutApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{activeTintColor: "#DCA392"}}>
        <Tab.Screen name="Main" 
        component={Main} 
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}/>
        <Tab.Screen 
          name="Community" 
          component={Community} 
          options={{
            tabBarIcon: () => (
              <Image source={require('../images/Community.png')} style={styles.Icon}/>
            ),
          }}
          />
        <Tab.Screen 
          name="Setting" 
          component={Setting} 
          options={{
            tabBarIcon: () => (
              <Image source={require('../images/Setting.png')} style={styles.Icon}/>
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  Icon: {
    width: 90 / 3,
    flex: 0.8,
  }
});

export default BreakoutApp;
