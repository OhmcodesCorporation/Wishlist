import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, Button, Image, KeyboardAvoidingView } from 'react-native';

import LoginForm from '../components/LoginForm';

import API_URLS from '../common/connections';

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
  constructor(props) {
    super(props);
  }

  verify() {
    AsyncStorage.getItem('jwt')
    .then((token) => {
      axios.post(API_URLS.verify_token_url,
      {
        token: token,
      })
      .then((response) => {
        if (token === response.data.token) {
          this.props.navigation.goBack();
          // this.props.navigation.navigate("Home");
        }
      })
      .catch((response) => {
        console.log("Token Verification FAILED");
      });
    }).catch((error) => {
      console.log("token expired (VERIFY)");
    });
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
