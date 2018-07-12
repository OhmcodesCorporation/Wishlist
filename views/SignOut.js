import React from 'react';
import { AsyncStorage } from 'react-native';

import LoadingScreen from './Loading';

export default class SignOut extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loggedOut: false,
    }
    this._handlePress = this._handlePress.bind(this);
  }

  _handlePress() {
    AsyncStorage.clear().then(()=> {
      console.log("removed token, logging out ... ");
      this.setState({
        loggedOut: true,
      });
      setTimeout(()=> {
        this.props.navigation.pop();
      }, 1000);
    }).catch((error) => {
      console.log(error);
    });
  }
  componentDidMount() {
    this._handlePress();
  }
  render() {
    return (
      <LoadingScreen/>
    );
  }
}
