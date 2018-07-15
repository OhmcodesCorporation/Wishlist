import React from 'react';
import axios from 'axios';

import { AsyncStorage, Alert, Stylesheet, View, Text, Image, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';

import API_URLS from '../common/connections';

import ProgressBar from '../components/ProgressBar';


const RightButton = (props) => {
  return (<Icon
    style={styles.headerButtonLeft}
    name='delete'
    containerStyle={styles.headerButtonRight}
    color='white'
    onPress={props.del}
    underlayColor='#3f91f5'
  />)
}

export default class Event extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {
      headerTitle: params ? params.props.title : "Event",
      headerRight: <RightButton del={() => {
        params.handleDelete();
      }}/>,
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

    };
  };

  constructor(props){
    super(props);
    this.state = {
      id:"",
      title: "",
      date: "",
      desc: "",
      location: "",
      fund: 0,
      target: 0,
    }
    this._delete = this._delete.bind(this);

  }
  componentWillMount() {
    let p = this.props.navigation.state.params.props;
    this.setState({
      id: p.id,
      title: p.title,
      desc: p.desc,
      date: p.date,
      location: p.location,
      fund: p.fund,
      target: p.target,
    });
  }
  deleteEvent = () => {
    Alert.alert(
      'Delete Event',
      'Warning: Pressing OK will delete the event',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          this._delete();
          this.props.navigation.goBack();
         }
        },
      ]
    )
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleDelete: this.deleteEvent
    })
  }
  _delete() {
    AsyncStorage.getItem('jwt')
      .then((token) => {
        axios({
          method: 'DELETE',
          url: API_URLS.delete_event_url + this.state.id + '/',
          headers: {
            'Authorization': 'JWT ' + token,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log(res.data);
          console.log("delete successful");
        })
        .catch((err) => {
          console.log(err);
          console.log("ERROR DELETING EVENT");
        })
      }).catch((err) => {
        console.log(err);
        console.log("ERROR GETTING TOKEN");
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
          {this.state.desc}
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
const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  headerButtonRight: {
    paddingRight: 25,
  }
}
