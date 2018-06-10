import React from 'react';
import axios from 'axios';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { AsyncStorage, View, ActivityIndicator} from 'react-native';

import Login from './views/Login';
import Home from './views/Home';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  }
};

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      loaded: false,
    }
  }

  componentWillMount() {
    this.verify();
    setTimeout(()=> {
      this.setState({
        loaded: true,
      })
    }, 600);
  }

  verify() {
    AsyncStorage.getItem('jwt')
    .then((token) => {
      axios.post('http://127.0.0.1:8000/api/token/verify/',
      {
        token: token,
      })
      .then((response) => {
        if (token === response.data.token) {
          this.setState({
            isAuthenticated: true,
          });
        }
      })
      .catch((response) => {
        console.log("Token Verification FAILED");
      });
    }).catch((error) => {
      console.log("token expired (VERIFY)");
    });
  }

  _renderScreen() {
    if (this.state.isAuthenticated) {
      return <Home/>;
    }
    return <Login/>;
  }
  render() {

    return (
      <View style={styles.container}>
        {(this.state.loaded) ? this._renderScreen() : <ActivityIndicator size="large" color='#0000ff'/>}
      </View>
    );
  }
}
