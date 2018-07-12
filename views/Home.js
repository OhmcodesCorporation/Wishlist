import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Wishlist from './Wishlist';
import Login from './LoggedOut';
import SignOut from './SignOut';
import Events from './Events';
import EventScreen from './Event'; // view more of the event
import AddEventForm from '../components/AddEventForm';

// theme for navigation bar
const navMenuStyle = {
  headerStyle: {
    backgroundColor: '#3f91f5' /* color theme */
  },
  headerTintColor: 'white',
};

const WishlistScreen = createStackNavigator({
  Default: {
    screen: Wishlist,
    navigationOptions: navMenuStyle
  }
});

const EventsScreen = createStackNavigator({
  Default: Events,
  Event: EventScreen,
  AddEvent: AddEventForm
},
{
  navigationOptions: navMenuStyle
});

const LoginScreen = createStackNavigator({
  Default: {
    screen: Login,
    navigationOptions: navMenuStyle
  }
});

const MyApp = createDrawerNavigator({
  Home: {
    screen: WishlistScreen, //DEFAULT: WishlistScreen
  },
  Events: {
    screen: EventsScreen,
  },
  Wishlist: {
    screen: WishlistScreen,
  },
  SignOut: {
    screen: SignOut,
    navigationOptions: navMenuStyle
  },
});

export default MyApp;
