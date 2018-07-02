import React from 'react';

import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import SignUp from './Signup';
import Home from './Home';
import Welcome from './Welcome';
import Login from './LoggedOut';

const fade = (props) => {
  const {position, scene} = props

  const index = scene.index

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
      inputRange: [index - 0.7, index, index + 0.7],
      outputRange: [0.3, 1, 0.3]
  })

  return {
      opacity,
      transform: [{translateX}, {translateY}]
  }
}

const LoginScreen = createStackNavigator({
    Default: {
      screen: Login, // DEFAULT: LOGIN
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Signup: {
      screen: SignUp,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#3f91f5' /* color theme */
        },
        headerTintColor: 'white',
      }
    }

  },
  {
    transitionConfig: () => ({
      screenInterpolator: (props) => {
          return fade(props);
      }
    })
  });

export default LoginScreen;
