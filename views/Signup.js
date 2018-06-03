import React from 'react';
import { View, ActivityIndicator,Text } from 'react-native';

const Signup = () => {
  return (
    <View style={styles.spinnerContainer}>
      <Text>
        PLEASE SIGN UP TO CONTINUE
      </Text>
    </View>
  );
};

const styles = {
  spinnerContainer: {
    flex: -1,
    marginTop: 12,
    marginBottom: 12
  }
};

export default Signup;
