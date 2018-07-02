import React from 'react';
import { View, ActivityIndicator,Text } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

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


export default class Signup extends React.Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Sign Up',
  });
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
    }
  }
  _submit() {
    
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
          <FormInput />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>E-mail</FormLabel>
          <FormInput />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>Password</FormLabel>
          <FormInput />
          <FormValidationMessage>Error message</FormValidationMessage>
          <FormLabel>Confirm Password</FormLabel>
          <FormInput />
          <FormValidationMessage>Error message</FormValidationMessage>
          <Button
            small
            raised
            backgroundColor='#3f91f5'
            title='Create New Account'
            style={styles.submit}
          />
        </View>
      </View>
    );
  }
}
