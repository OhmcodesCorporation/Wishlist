import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Wishlist from './Wishlist';
import Login from './Login';
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
  Default: {
    screen: Events,
    navigationOptions: navMenuStyle
  },
  Event: {
    screen: EventScreen, //not to be confused with Event"S"
    navigationOptions: navMenuStyle
  },
  AddEvent: {
    screen: AddEventForm,
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
  }
});

export default MyApp;
