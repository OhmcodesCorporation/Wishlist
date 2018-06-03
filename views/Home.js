import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Wishlist from './Wishlist';
import Login from './Login';
import Events from './Events';
import EventScreen from './Event'; // view more of the event
import SignUp from '../views/Signup';

// theme for navigation bar
const navMenuStyle = {
  headerStyle: {
    backgroundColor: '#3f91f5' /* color theme */
  },
  headerTintColor: 'white',
};

const LoginScreen = createStackNavigator({
  Default: {
    screen: Login,
  },
  Home: {
    screen: Wishlist,
    navigationOptions: navMenuStyle
  },
  Signup: {
    screen: SignUp // TODO: UNFINISHED PAGE
  }
});

const EventsScreen = createStackNavigator({
  Default: {
    screen: Events,
    navigationOptions: navMenuStyle
  },
  Event: {
    screen: EventScreen, //not to be confused with Event"S"
    navigationOptions: navMenuStyle
  }
})
const MyApp = createDrawerNavigator({
  Home: {
    screen: LoginScreen // change this to LOGIN LATER AS DEFAULT
  },
  Events: {
    screen: EventsScreen,
  }

});

export default MyApp;
