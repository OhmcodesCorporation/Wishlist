import React from 'react';
import axios from 'axios';
import { AsyncStorage, ScrollView, View } from 'react-native';
import { Icon } from 'react-native-elements';

import EventItem from '../components/EventItem';
import API_URLS from '../common/connections';


const LeftButton = (props) => {
  return (<Icon
    style={styles.headerButtonLeft}
    onPress={() => props.nav.toggleDrawer()}
    name='menu'
    containerStyle={styles.headerButtonLeft}
    color='white'
    underlayColor='#3f91f5'
  />)
}
const RightButton = (props) => {
  return (<Icon
    style={styles.headerButtonLeft}
    onPress={()=> props.nav.navigate('AddEvent', {props: props})}
    name='add'
    containerStyle={styles.headerButtonRight}
    color='white'
    underlayColor='#3f91f5'
  />)
}
export default class Events extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'My Events',
    headerLeft: <LeftButton nav={navigation}/>,
    headerRight: <RightButton nav={navigation}/>
  });
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }
  getEvents() {
    AsyncStorage.getItem('jwt')
      .then((token) => {
        axios.get(API_URLS.get_all_events_url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token,
          },
        })
        .then((res) => {
          this.setState({
            events: res.data
          });
        })
        .catch((err) => {
          console.log(err);
          console.log("ERROR GETTING EVENTS");
        })
      }).catch((err) => {
        console.log(err);
        console.log("ERROR GETTING TOKEN");
      });
  }
  componentWillMount() {
    this.getEvents();
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.events.reverse().map((ev, index) => (
            <EventItem style={styles.item} key={ev.pk}
              id={parseInt(ev.pk, 10)}
              navigation={this.props.navigation}
              target={parseInt(ev.target_fund,10)}
              title={ev.title}
              date={ev.edate}
              desc={ev.desc}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  headerButtonLeft: {
    paddingLeft: 25,
  },
  headerButtonRight: {
    paddingRight: 25,
  }
}
