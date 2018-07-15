import React from 'react';
import axios from 'axios';

import { AsyncStorage, View, ActivityIndicator, ImageBackground, Text, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import LoginForm from '../components/LoginForm';

import API_URLS from '../common/connections';

const bg_loc = '../assets/wish-bg-op.png';

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  authenticate(username, password) {
    axios.post(API_URLS.authentication_url,
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
        <ImageBackground
          style={styles.container}
          source={require(bg_loc)}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>
              WISH.
            </Text>
            <Text style={styles.subtitle}>
              Be careful what you wish for, you might just get it.
            </Text>
          </View>
          <View style={styles.loginContainer}>
            <View style={styles.inputContainer}>
              <FormInput
                inputStyle={styles.input}
                placeholder="username or email"
                placeholderTextColor="rgba(0,0,0,0.7)"
                returnKeyType="next"
                label="username"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(input) => this.setState({username: input})}
                onSubmitEditing={() => this.passwordInput.focus()}
                />
                <FormInput
                  inputStyle={styles.input}
                  placeholder="password"
                  label="password"
                  secureTextEntry
                  returnKeyType="go"
                  placeholderTextColor="rgba(0,0,0,0.7)"
                  style={styles.input}
                  onChangeText={(input) => this.setState({password: input})}
                  blurOnSubmit
                />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                backgroundColor="rgba(90, 200, 250, 1)"
                raised
                title='LOGIN'
                onPress={this.handleSubmit}
               />
               <Button
                 backgroundColor="rgba(90, 200, 250, 1)"
                 raised
                 title='SIGNUP'
                 onPress={()=>this.props.navigation.navigate("Signup")}
                />
            </View>
          </View>
        </ImageBackground>

    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  welcomeContainer: {
    flex: 3,
    width: 250,
    justifyContent: 'center',
  },
  loginContainer: {
    flex: 2,
    justifyContent: 'space-around'
  },
  title: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
  },
  input: {
    textAlign: 'center',
    color: 'black',
    margin: 5,
    paddingBottom: 5
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }

}
