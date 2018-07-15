import React from 'react';
import axios from 'axios';
import { AsyncStorage, StyleSheet, StatusBar, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import { FormInput, Icon } from 'react-native-elements';
import Toast from 'react-native-root-toast';
import API_URLS from '../common/connections';

import DateTimePicker from 'react-native-modal-datetime-picker';

export default class AddEventForm extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {
      headerTitle: 'Add Event',
      headerStyle: {
        backgroundColor: '#3f91f5',
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft:
        <Icon
          onPress={()=>navigation.goBack()}
          size={32}
          name='chevron-left'
          containerStyle={{ paddingLeft: 20}}
          color='white'
          underlayColor='#3f91f5'/>
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
      toastVisible: false,
      success: false,
    }
    this.inputs = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.showMessageAsToast = this.showMessageAsToast.bind(this);
  }
  focusNextField(id) {
    this.inputs[id].focus();
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

  showMessageAsToast(msg) {
    let toast = Toast.show(msg, {
      duration: Toast.durations.LONG,
      position: 80,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: this.state.success ? 'rgba(76, 217, 100, 1)' : 'rgba(255, 59, 48, 1)',
      onShown: () => {
        // calls on toast\`s appear animation end.
        if (this.state.success) {
          setTimeout(()=> {
            this.props.navigation.state.params.props.reload();
          }, 1000);
        }
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
        this.props.navigation.goBack();
      },
  });
  }
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
           "target_fund": this.state.target_fund,
           "status":"inc",
           "visibleto":"all"
          }
        })
        .then((res) => {
          console.log("SUCCESS ADDING EVENT");
          this.setState({
            success: true,
          });
          this.showMessageAsToast("Event successfully added.");
        })
        .catch((res, err) => {
          console.log(res);
          console.log("ERROR ADDING EVENT");
          this.showMessageAsToast("Please correct one or more of your inputs.");
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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
            onSubmitEditing={() => this.focusNextField('two')}
            ref={ input => {
              this.inputs['one'] = input;
            }}
            returnKeyType={ "next" }
            style={styles.input}
            blurOnSubmit={false}
          />
          <TouchableOpacity >
            <TextInput
              placeholder={this.state.converted_date}
              label="date"
              returnKeyType="next"
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={styles.input}
              onFocus={this._showDateTimePicker}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('three');
              }}
              ref={ input => {
              this.inputs['two'] = input;
            }}
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
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.focusNextField('four');
            }}
            ref={ input => {
              this.inputs['three'] = input;
            }}
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
            blurOnSubmit={false}
            ref={ input => {
              this.inputs['four'] = input;
            }}
             returnKeyType={ "done" }
             onSubmitEditing={this.handleSubmit}
          />
          <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    );
  }
}
const styles = {
  container: {
    padding: 19,
    flex: 1,
    backgroundColor: '#3f91f5',
    justifyContent: 'center'
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
}
