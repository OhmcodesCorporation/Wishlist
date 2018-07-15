import React from 'react';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

import Welcome from './views/Welcome';

export default class App extends React.Component {

    render() {
      return (
        <Welcome/>
      )
    }
}
