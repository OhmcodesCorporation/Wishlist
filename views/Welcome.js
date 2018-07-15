import React from 'react';
import axios from 'axios';
import { AsyncStorage, View, ActivityIndicator, ImageBackground, Text } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';

import API_URLS from '../common/connections';

import LoadingScreen from './Loading';
import Login from './Login';
import Home from './Home';

class Welcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    }
    this.startTokenRefresh = this.startTokenRefresh.bind(this);
  }

  _verify() {
    AsyncStorage.getItem('jwt')
    .then((token) => {
      axios.post(API_URLS.verify_token_url,
      {
        token: token,
      })
      .then((response) => {
        console.log("Token Verified!");
        this.setState({
          isAuthenticated: true,
        });
      })
      .catch((response) => {
        console.log("Token Verification FAILED");

      });
    }).catch((error) => {
      console.log("token expired (VERIFY)");
    });
  }

  startTokenRefresh() {
    setInterval(()=> {
      console.log("verifying token");
      AsyncStorage.getItem('jwt').then((token)=>{

        axios.post(API_URLS.refresh_token_url, {
          token: token
        }).then((res)=> {
          AsyncStorage.setItem('jwt', token);
          console.log(res);
        }).catch((err)=> {
          console.log('token refresh error');
        })
      }).catch((err)=> {
        console.log('error getting token');
      });
    }, 5000);
  }

  componentWillMount() {
    this._verify();
    setTimeout(()=> {
      if (this.state.isAuthenticated) {
        // this.startTokenRefresh();
        this.props.navigation.navigate("App");
      } else {
        this.props.navigation.navigate("Auth");
      }
    }, 1250);
  }

  render() {
    return (
      <LoadingScreen/>
    );
  }
}

const fade = (props) => {
  const {position, scene} = props

  const index = scene.index

  const translateX = 0
  const translateY = 0

  const opacity = position.interpolate({
      inputRange: [index - 0.7, index, index + 0.7],
      outputRange: [0.3, 1, 0.3]
  })

  return {
      opacity,
      transform: [{translateX}, {translateY}]
  }
}

export default createSwitchNavigator(
  {
    AuthLoading: Welcome, // default: Welcome
    App: Home,
    Auth: Login,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
