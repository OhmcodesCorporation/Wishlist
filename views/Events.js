import React from 'react';
import axios from 'axios';
import { AsyncStorage, ScrollView, View, RefreshControl } from 'react-native';
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
  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    return {
      headerTitle: 'My Events',
      headerLeft: <LeftButton nav={navigation}/>,
      headerRight: <RightButton nav={navigation} reload={()=> {
        params.reloadEvents()
      }}/>,
      headerStyle: {
        backgroundColor: '#3f91f5',
      },
      headerTitleStyle: {
        color: 'white'
      }
    }

  };
  componentDidMount() {
    this.props.navigation.setParams({
      reloadEvents: this.getEvents
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      refreshing: false,
    }
    this.getEvents = this.getEvents.bind(this);
  }
  getEvents() {

    AsyncStorage.getItem('jwt')
      .then((token) => {
        this.setState({
          refreshing: true
        });
        setTimeout(()=> {
          axios.get(API_URLS.get_all_events_url, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'JWT ' + token,
            },
          })
          .then((res) => {
            let reversed = res.data.reverse();
            this.setState({
              refreshing: false,
              events: reversed
            });
          })
          .catch((err) => {
            console.log(err);
            console.log("ERROR GETTING EVENTS");
          })
        }, 500);


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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.getEvents}
          />
        }>
        <View style={styles.container}>
          {this.state.events.map((ev, index) => (
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
