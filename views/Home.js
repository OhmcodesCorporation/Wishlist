import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { createDrawerNavigator, createStackNavigator, DrawerItems } from 'react-navigation';

import Wishlist from './Wishlist';
import Login from './LoggedOut';
import SignOut from './SignOut';
import Events from './Events';
import EventScreen from './Event'; // view more of the event
import AddEventForm from '../components/AddEventForm';

const CustomDrawerComponent = (props) => (
  <ScrollView style={{ flex: 1}}>
    <View style={{height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../assets/star.png')} style={{ height: 120, width: 120, borderRadius: 60, }}/>
    </View>
    <DrawerItems {...props}/>
  </ScrollView>
)
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

});

const LoginScreen = createStackNavigator({
  Default: {
    screen: Login,
    navigationOptions: navMenuStyle
  }
});

const MyApp = createDrawerNavigator({
  Home: {
    screen: EventsScreen, //DEFAULT: WishlistScreen
    navigationOptions: {
      drawerIcon: ({tintColor}) => {
        return (
          <Icon
          name='home'
          color='#3f91f5'
          underlayColor='#3f91f5'
        />)
      }
    }
  },
  Events: {
    screen: EventsScreen,
    navigationOptions: {
    inactiveTintColor: 'black',
      drawerIcon: ({tintColor}) => {
        return (
          <Icon
          name='event'
          color='#3f91f5'
          underlayColor='#3f91f5'
        />)
      }
    }
  },
  Wishlist: {
    screen: WishlistScreen,
    navigationOptions: {
    inactiveTintColor: 'black',
      drawerIcon: ({tintColor}) => {
        return (
          <Icon
          name='list'
          color='#3f91f5'
          underlayColor='#3f91f5'
        />)
      }
    }
  },
  SignOut: {
    screen: SignOut,
    navigationOptions: {
    inactiveTintColor: 'black',
      drawerIcon: ({tintColor}) => {
        return (
          <Icon
            type='font-awesome'
            name='sign-out'
            color='#3f91f5'
            underlayColor='#3f91f5'
          />)
      }
    }
  },
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: '#3f91f5',
  }
});

export default MyApp;
