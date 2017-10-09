import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class TestScreen extends React.Component {
  onPressLearnMore() {
      return null;
    }
  render() {  
    return (
      <View style={styles.container}>
        <Button
          onPress={this.onPressLearnMore.bind(this)}
          title="Test Screen"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});