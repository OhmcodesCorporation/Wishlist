import React from 'react';
import { StyleSheet, StatusBar, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import axios from 'axios';

const styles = {
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 70,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
    backgroundColor: '#2980b9',
  },
  buttonText: {
    textAlign: 'center',
    color: "#FFFFFF"
  }
}

export default class LoginForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      jwt: "",
    }
    this.authenticate = this.authenticate.bind(this);
  }

  componentWillMount() {

  }

  authenticate(event) {
    // call when authentication successful

    if (this.state.username === 'a') {
      this.props.handler();
    }
    // stay on this page if not successful

    // console.log(this.state.password);
    // axios.post('http://192.168.1.89/api/auth/token/obtain/',{
    //   username: this.state.username,
    //   password: this.state.password,
    // })
    // .then((response) => {
    //   // deviceStorage.saveKey("id_token", response.data.access);
    //   console.log(response.data.access);
    // })
    // .catch((response) => {
    //   console.log(response);
    //   console.log("error logging in");
    // })
  }
  render() {
     // success authentication
    return(
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <TextInput
          placeholder="username or email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          label="username"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(input) => this.setState({username: input})}
          onSubmitEditing={() => this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          label="password"
          secureTextEntry
          returnKeyType="go"
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={styles.input}
          onChangeText={(input) => this.setState({password: input})}
          blurOnSubmit
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}
            onPress={this.props.authenticate}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
            onPress={()=>this.props.navigation.navigate("Signup")}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
