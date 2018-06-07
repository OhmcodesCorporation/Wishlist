import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const styles = {
  container: {
    width: 150,
    height: 150,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  info: {
    textAlign: 'center'
  }
}
export default class EventItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      title: "",
      date: "",
      location: "",
      fund: 0,
      target: 0,
    }
  }
  componentWillMount() {
    this.setState({
      id: this.props.id,
      title: this.props.title,
      date: this.props.date,
      location: this.props.location,
      fund: this.props.fund,
      target: this.props.target,
    });

  }
  componentDidMount() {

  }
  render() {
    let { navigate } = this.props.navigation;
    let info = this.state;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={()=>{navigate('Event', {props: info})}}
        >
        <Text style={styles.title}>
          {this.state.title}
        </Text>
        <Text style={styles.info}>
          {this.state.date}
          {this.state.location}
        </Text>
      </TouchableOpacity>
    );
  }
};
