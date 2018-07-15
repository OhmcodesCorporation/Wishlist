import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styled from 'styled-components/native';

import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

import Product from '../components/Product';

const styles = {
  centerProduct: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  headerButtonLeft: {
    paddingLeft: 25
  }
}
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
export default class Wishlist extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'My Wishlist',
    headerLeft: <LeftButton nav={navigation}/>,
    headerStyle: {
      backgroundColor: '#3f91f5',
    },
    headerTitleStyle: {
      color: 'white'
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    }
  }

  componentWillMount() {
    let data = [];
    for (let i = 0; i < 5; i++) {
      data.push(
        <Product name="Magic Lamp" price="500"/>
      )
    }
    this.setState({
      entries: data,
    })
  }

  _renderItem ({item, index}) {
    return (
      <View>
        <Text>{ item.title }</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.centerProduct}>
        <Product name="Magic Lamp" price="500"/>

      </View>
    );
  }
}
