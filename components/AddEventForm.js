import React from 'react';
import axios from 'axios';
import { AsyncStorage, StyleSheet, StatusBar, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#3498db',
    flex: 1,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  descriptionInput: {
    height: 200,
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
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'My Events',
  });

  constructor(props){
    super(props);

    this.state = {
      title: "",
      desc: "",
      edate: "",
      target_fund: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addEvent() {
    AsyncStorage.getItem('jwt')
      .then((token) => {
        axios({
          method: 'POST',
          url: 'http://localhost:8000/api/events/',
          headers: {
            'Authorization': 'JWT ' + token,
            'Content-Type': 'application/json',
          },
          data: {
           "title":"Test Event 5",
           "desc":"This is a test for curl",
           "edate":"2018-07-23T02:22:43Z",
           "target_fund":"3500",
           "status":"inc",
           "visibleto":"all"
          }
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          console.log("ERROR ADDING EVENT");
        })
      }).catch((err) => {
      console.log(err);
      console.log("ERROR getting TOKEN for addevent");
    });
  }

  handleSubmit() {
    this.addEvent();
  }
  render() {
     // success authentication
    return(
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <TextInput
          placeholder="title"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          label="title"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(input) => this.setState({title: input})}
          onSubmitEditing={() => this.passwordInput.focus()}
          style={styles.input}
        />
        <TextInput
          placeholder="date"
          label="date"
          returnKeyType="next"
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={styles.input}
          onChangeText={(input) => this.setState({date: input})}
          blurOnSubmit
        />
        <TextInput
          placeholder="Add a little description"
          label="description"
          autoCorrect={false}
          returnKeyType="next"
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={styles.descriptionInput}
          onChangeText={(input) => this.setState({desc: input})}
          blurOnSubmit
        />
        <TextInput
          placeholder="What's your target fund?"
          label="target_fund"
          keyboardType="numeric"
          returnKeyType="go"
          maxLength={6}
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={styles.input}
          onChangeText={(input) => this.setState({target_fund: input})}
          blurOnSubmit
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}
            onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
