import React from 'react';
import axios from 'axios';
import { AsyncStorage, StyleSheet, StatusBar, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

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
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  authenticate(username, password) {
    axios.post('http://127.0.0.1:8000/api/token/auth/',
    {
      username: username,
      password: password,
    })
    .then((response) => {
      console.log("AUTHENTICATED!");
      AsyncStorage.setItem('jwt', response.data.token);

      setTimeout(() => {
        console.log('Logging In');
        this.props.navigation.navigate("Home");
      }, 1500);
    })
    .catch((response) => {
      console.log("error logging in (AUTH)");
    });
  }
  handleSubmit() {
    this.authenticate(this.state.username, this.state.password);
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
            onPress={this.handleSubmit}>
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
