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
  }
}

export default class Wishlist extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Wishlist',
    headerLeft: (
      <Icon onPress={() => navigation.toggleDrawer()}
      name='menu'
      color='white'></Icon>
    )
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
