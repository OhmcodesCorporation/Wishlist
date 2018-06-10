import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { Button } from 'react-native-elements';

const bg_loc = '../assets/wish-bg-op.png';

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  welcome_container: {
    width: 250,
    alignSelf: 'center'
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
export default class Welcome extends React.Component {

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
        <Button
          clear={true}
          onPress={()=> this.props.navigation.navigate("Login")}
          style={styles.getStartedBtn}
          rounded
          color='black'
          backgroundColor='white'
          title='Get Started'
          />
      </ImageBackground>
    );
  }
}
