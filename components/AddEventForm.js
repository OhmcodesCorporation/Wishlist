import React from 'react';
import axios from 'axios';
import { AsyncStorage, StyleSheet, StatusBar, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import { FormInput } from 'react-native-elements';

import API_URLS from '../common/connections';

import DateTimePicker from 'react-native-modal-datetime-picker';

export default class LoginForm extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {
      headerTitle: "Add Event"
    }
  };

  constructor(props){
    super(props);

    this.state = {
      title: "",
      desc: "",
      edate: "",
      target_fund: "",
      isDateTimePickerVisible: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();

    // convert date to readable format
    let c_date = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }).format(date);

    this.setState({
      converted_date: c_date,
      date: date
    });

  };

  addEvent() {
    // will return error for existing same event name
    AsyncStorage.getItem('jwt')
      .then((token) => {
        axios({
          method: 'POST',
          url: API_URLS.post_new_event_url,
          headers: {
            'Authorization': 'JWT ' + token,
            'Content-Type': 'application/json',
          },
          data: {
           "title": this.state.title,
           "desc": this.state.desc,
           "edate": this.state.date,
           "target_fund":"3500",
           "status":"inc",
           "visibleto":"all"
          }
        })
        .then((res) => {
          console.log("SUCCESS ADDING EVENT");
          setTimeout(()=>{
            this.props.navigation.goBack();
          }, 500);

        })
        .catch((res, err) => {
          console.log(res);
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
        <TouchableOpacity >
          <TextInput
            placeholder={this.state.converted_date}
            label="date"
            returnKeyType="next"
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={styles.input}
            onFocus={this._showDateTimePicker}
            blurOnSubmit
            >
          </TextInput>
        </TouchableOpacity>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
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
const styles = {
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#3f91f5'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  descriptionInput: {
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    paddingHorizontal: 10,
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
    color: "#FFFFFF"
  }
}
