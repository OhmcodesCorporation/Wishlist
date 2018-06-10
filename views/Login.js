import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button, Image, KeyboardAvoidingView } from 'react-native';

import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import LoginForm from '../components/LoginForm';

import SignUp from './Signup';
import Home from './Home';
import Welcome from './Welcome';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: 'white',
    width: 160,
    textAlign: 'center'
  },
}

class Login extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/atom.png')}/>
          <Text style={styles.title}>An app where your wishes may come true</Text>
        </View>
        <View>
          <LoginForm navigation={this.props.navigation}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
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
      screen: Welcome, // DEFAULT: LOGIN
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: Login,
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
    Signup: SignUp,
  },
  {
    transitionConfig: () => ({
        screenInterpolator: (props) => {
            return fade(props)
        }
    })
  });

export default LoginScreen;
