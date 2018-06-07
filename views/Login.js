import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button, Image, KeyboardAvoidingView } from 'react-native';

import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import LoginForm from '../components/LoginForm';

import SignUp from './Signup';
import Home from './Home';

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
        <View style={styles.formContainer}>
          <LoginForm
            authenticate={this.authenticate}
            navigation={this.props.navigation}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const LoginScreen = createStackNavigator({
  Default: Login,
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Signup: SignUp,
});

export default LoginScreen;
