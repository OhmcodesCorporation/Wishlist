import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import EventItem from '../components/EventItem';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  eventRow: {
    padding: 10,
    justifyContent: 'space-around'
  },
  headerButtonLeft: {
    paddingLeft: 25,
  }
}

// const DEF_DATA = {
//   [ title: "Event 1",
//     location: "Burnaby",
//     date: "January 1, 2018"
//   ],
//   [ title: "Event 2",
//     location: "Burnaby",
//     date: "January 1, 2018"
//   ],
//   [ title: "Event 3",
//     location: "Burnaby",
//     date: "January 1, 2018"
//   ],
//   [ title: "Event 4",
//     location: "Burnaby",
//     date: "January 1, 2018"
//   ],
//   [ title: "Event 5",
//     location: "Burnaby",
//     date: "January 1, 2018"
//   ],
//   [ title: "Event 6",
//     location: "Burnaby",
//     date: "January 1, 2018"
//   ],
//
// };
export default class Events extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'My Events',
    headerLeft: (
      <Icon onPress={() => navigation.toggleDrawer()}
      name='menu'
      color='white'></Icon>
    ),
    headerRight: <Icon name='edit' color='white'></Icon>
  });

  render() {
    return (
      // TODO: target, title,date, location must be fetched from DB
      <View style={styles.container}>
        <View style={styles.eventRow}>
          <EventItem navigation={this.props.navigation} target={5000} fund={2323} title="Event 1" location="Vancouver" date="February 15, 2018"/>
          <EventItem navigation={this.props.navigation} target={5000} fund={231} title="Event 2" location="Vancouver" date="February 15, 2018"/>
          <EventItem navigation={this.props.navigation} target={5000} fund={3322} title="Event 3" location="Surrey" date="December 15, 2018"/>
        </View>
        <View style={styles.eventRow}>
          <EventItem navigation={this.props.navigation} target={5000} fund={2122} title="Event 4" location="Burnaby" date="January 15, 2018"/>
          <EventItem navigation={this.props.navigation} target={5000} fund={323} title="Event 5" location="San Francisco" date="January 15, 2018"/>
          <EventItem navigation={this.props.navigation} target={5000} fund={1235} title="Event 6" location="Burnaby" date="January 15, 2018"/>
        </View>

      </View>
    );
  }
}
