import React from 'react';
import { View, ActivityIndicator, ImageBackground, Text } from 'react-native';

const bg_loc = '../assets/wish-bg-op.png';

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={require(bg_loc)}>
        <View style={styles.welcome_container}>
          <Text style={styles.title}>
            WISH.
          </Text>
          <Text style={styles.subtitle}>
            Be careful what you wish for, you might just get it.
          </Text>
        </View>
        <View style={styles.loader_container}>
          <ActivityIndicator size="large" color="white"/>
        </View>
      </ImageBackground>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  welcome_container: {
    flex: 3,
    width: 250,
    justifyContent: 'center'
  },
  loader_container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
  },
  getStartedBtn: {
    bottom: -200,
    width: 250,
  }

}
