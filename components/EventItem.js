import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Card } from 'react-native-elements';

const styles = {
  container: {
    width: 175,
    height: 175,
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
      desc: "",
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
      desc: this.props.desc,
      date: this.props.date,
      location: this.props.location,
      fund: this.props.fund,
      target: this.props.target,
    });

  }
  render() {
    let { navigate } = this.props.navigation;
    let info = this.state;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={()=>{navigate('Event', {props: info})}}
        >
        <Card title={this.state.title}>
          <Text style={styles.info}>
            {this.state.date}
            {this.state.location}
          </Text>
        </Card>
      </TouchableOpacity>
    );
  }
};
