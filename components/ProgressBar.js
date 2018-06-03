import React from 'react';
import { Dimensions, View } from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

const styles = {
  container: {
    paddingTop: 50,
    paddingBottom: 50,
  }
}
const progressCustomStyles = {
  backgroundColor: '#E3170A',
  borderRadius: 5,
  borderColor: 'orange',
};

export default class Default extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      target: 0,
    }
  }
  componentWillMount() {
    this.setState({
      current: this.props.size,
      target: this.props.target,
    })
  }
  render() {
    if (this.state) {
      const barWidth = Dimensions.get('screen').width - 100;
      const barValue = (this.state.current/this.state.target) * 100;


      return (
        <ProgressBarAnimated
          {...progressCustomStyles}
          width={barWidth}
          value={barValue}
          backgroundColorOnComplete='#A9E5BB'
        />

      );
    }
    return (
      <Text>
        Loading...
      </Text>
    );
  }
}
