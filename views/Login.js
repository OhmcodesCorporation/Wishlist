import React from 'react';
import { StyleSheet, Text, View, Button, Image, KeyboardAvoidingView } from 'react-native';

import LoginForm from '../components/LoginForm';

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

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false
    };
    this.authenticate = this.authenticate.bind(this);
  }

  //TODO: NEED POST METHOD TO AUTHENTICATE
  authenticate() {
    this.setState({
      isAuthenticated: !this.state.isAuthenticated
    })
    console.log(this.state.isAuthenticated);
    // TODO: FIX AUTHENTICATION ISSUE TRANSITIONING PAGES
  }
  render() {
    if (this.state.isAuthenticated) {
      this.props.navigation.navigate("Home");
    }
    return(
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/atom.png')}/>
          <Text style={styles.title}>An app where your wishes may come true</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm authenticate={this.authenticate} navigation={this.props.navigation}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
