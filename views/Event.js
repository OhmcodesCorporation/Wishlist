import React from 'react';

import { Stylesheet, View, Text, Image, TouchableOpacity} from 'react-native';

import ProgressBar from '../components/ProgressBar';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#03A9F4',
    height: "100%",
  },
  header: {
    backgroundColor: '#1B4965',
    width: 350,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center'
  },
  textColor: {
    color: '#FFFFFF'
  },

  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  wishItemContainer: {
    alignItems: 'center',
    marginTop: 50,
    padding: 35,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  wishItem: {
    width: 150,
    height: 150,

  },
  inviteeContainer: {
    flexDirection: 'row',
    height: 250,
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
  },
  invitee: {
    height: 50,
    width: 50,
    paddingTop: 50,
    backgroundColor: 'black'
  },
  progressContainer: {
    flexDirection: 'column',
    padding: 25,
  },
  textCenter: {
    textAlign: 'center'
  }
}
export default class Event extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {
      headerTitle: params ? params.props.title : "Event"
    };
  };
  constructor(props){
    super(props);
    this.state = {
      title: "",
      date: "",
      location: "",
      fund: 0,
      target: 0,
    }
  }
  componentWillMount() {
    let p = this.props.navigation.state.params.props;
    this.setState({
      title: p.title,
      date: p.date,
      location: p.location,
      fund: p.fund,
      target: p.target,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, styles.textColor]}>
            Due {this.state.date}
          </Text>
        </View>
        <View style={styles.wishItemContainer}>
          <Image style={styles.wishItem}
          source={require('../assets/lamp.jpg')}
          />
          <Text>
            Reason: LOREM IPSUM IUPSS PPSID MSAUD
          </Text>

        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.textCenter}>
            Current: ${this.state.fund}
          </Text>
          <ProgressBar size={this.state.fund} target={this.state.target}/>
          <Text style={styles.textCenter}>
            Target: ${this.state.target}
          </Text>
        </View>

        <View style={styles.inviteeContainer}>
          <Text>
            Invitees:
          </Text>
          {/* INVITEES */}
          <View></View>
          <TouchableOpacity style={styles.invitee}>A</TouchableOpacity>
          <TouchableOpacity style={styles.invitee}>A</TouchableOpacity>
          <TouchableOpacity style={styles.invitee}>A</TouchableOpacity>
          <TouchableOpacity style={styles.invitee}>A</TouchableOpacity>
        </View>
      </View>
    )
  }
}
