import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';

export default class Wishlist extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Wishlist',
    headerLeft: (
      <Icon onPress={() => navigation.toggleDrawer()}
      name='menu'
      color='white'></Icon>
    )
  });

  constructor(props){
    super(props);

    this.state = {
      name: "",
      price: 0
    }
  }

  componentWillMount() {
    this.setState({
      name: this.props.name,
      price: this.props.price
    })
  }

  render() {
    return (
      <View>
        <Card
          title={this.state.name}
          image={require('../assets/lamp.jpg')}>
          <Text style={{marginBottom: 10}}>
            The idea with React Native Elements is more about component structure than actual design.
          </Text>
          <Button
            raised
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' />
        </Card>
      </View>

    );
  }
}
