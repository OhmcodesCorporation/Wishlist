import React from 'react';
import axios from 'axios';
import { View, ActivityIndicator,Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import API_URLS from '../common/connections';


const ERROR = [
  "Username Exists or Invalid Input",
  "Email already being used or invalid characters",
  "Passwords don't match or not secure"
];
export default class Signup extends React.Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Sign Up',
  });
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password2: "",
      email: "",
      errorMsg: [],
      isFormValid: false,
      isSubmitting: false,
    }
    this._validateForm = this._validateForm.bind(this);
    this._confirmPassword = this._confirmPassword.bind(this);
    this._submit = this._submit.bind(this);
  }
  _validateForm() {
    // check forms
    let formIsValid = this.state.username !== "" &&
            this.state.email !== "" &&
            this._confirmPassword();
    if (formIsValid) {
      this.setState({
        isFormValid: formIsValid,
      });
      return formIsValid;
    }

    return false;
  }
  _submit() {
    this.setState({
      isSubmitting: true,
    });

    setTimeout(()=> {
      if (this._validateForm()) {
        console.log("sending data");
        console.log(this.state);
        axios.post(API_URLS.register_user_url, {
          "username": this.state.username,
          "password": this.state.password,
          "password2": this.state.password,
          "email": this.state.email,
        }).then((res) => {
          console.log("Registration Successful");
          this.props.navigation.goBack();
        }).catch((err)=> {
          console.log(err);
          console.log("Registration error");
        })
      } else {
        console.log("One of the form input is invalid");
      }
    }, 700);

    this.setState({
      isSubmitting: false,
    });
  }
  _confirmPassword() {
    return this.state.password === this.state.password2;
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.socialMediaContainer}>
          <Button
            small
            raised
            icon={{name: 'facebook', type: 'font-awesome'}}
            backgroundColor='#337ab7'
            title='Continue with Facebook'
            style={styles.loginButtons}
          />
          <Button
            small
            raised
            icon={{name: 'google', type: 'font-awesome'}}
            backgroundColor='#FF4C00'
            title='Continue with Gmail'
            style={styles.loginButtons}
          />
        </View>
        <View style={styles.formContainer}>
          <FormLabel>Username</FormLabel>
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(input) => this.setState({username: input})}/>
          <FormValidationMessage>{this.state.username === "" ? ERROR[0] : "" }</FormValidationMessage>
          <FormLabel>E-mail</FormLabel>
          <FormInput
            autoCapitalize="none"
            autoCorrect={false}
            ref='forminput'
            textInputRef='email'
            onChangeText={(input) => this.setState({email: input})}/>
          <FormValidationMessage>{this.state.email === "" ? ERROR[1] : "" }</FormValidationMessage>
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            onChangeText={(input) => this.setState({password: input})}/>
          <FormLabel>Confirm Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            onChangeText={(input) => this.setState({password2: input})}/>
          <FormValidationMessage>{this.state.username === "" ? ERROR[2] : "" }</FormValidationMessage>
          <Button
            small
            raised
            backgroundColor='#3f91f5'
            title='Create New Account'
            style={styles._submit}
            onPress={this._submit}
            disabled={this.state.isSubmitting}
          />
        </View>
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 4,
    justifyContent: 'space-around'
  },
  socialMediaContainer: {
    flex: 1,
    paddingVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  title: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  loginButtons: {
    paddingVertical: 5
  },
  submit: {
    paddingBottom: 10
  }
};
