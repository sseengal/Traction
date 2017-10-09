import React from 'react';
import firebase from 'firebase';
import { View, StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';

// import Screens here::
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import TestScreen from './screens/TestScreen';
import ConfidenceLevelScreen from './screens/ConfidenceLevelScreen';
import ObservationsScreen from './screens/ObservationsScreen';
import ResultScreen from './screens/ResultScreen';
import BenchmarkScreen from './screens/BenchmarkScreen';
import CorrelateScreen from './screens/CorrelateScreen';
//

//firebase config comes here::
//
//
 const config = {
    apiKey: 'AIzaSyD1w2O_j4UH-u6NUc9o7lDHKv-rNC66zcI',
    authDomain: 'traction-cb279.firebaseapp.com',
    databaseURL: 'https://traction-cb279.firebaseio.com',
    projectId: 'traction-cb279',
    storageBucket: '',
    messagingSenderId: '52929012911'
  };
  firebase.initializeApp(config);


export default class App extends React.Component {
  render() {
    // const MainNavigator = StackNavigator({
    //     welcome: { screen: WelcomeScreen },
    //     auth: { screen: AuthScreen },
    //     test: { screen: TestScreen },
    //     confidenceLevel: { screen: ConfidenceLevelScreen },
    //     benchmark: { screen: BenchmarkScreen },
    //     observations: { screen: ObservationsScreen },
    //     result: { screen: ResultScreen }
    //   },
    //     {
    //       animationEnabled: false,
    //       tabBarPosition: 'bottom',
    //       lazy: true,
    //       navigationOptions: {
    //         tabBarVisible: false
    //       }
    //     }
    //   );

       const MainNavigator = TabNavigator({
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        testflow: { 
          screen: StackNavigator({
            test: { screen: TestScreen },
            confidenceLevel: { screen: ConfidenceLevelScreen },
            benchmark: { screen: BenchmarkScreen },
            correlate: { screen: CorrelateScreen },
            observations: { screen: ObservationsScreen },
            result: { screen: ResultScreen } 
          })
        }   
      },
        {
          animationEnabled: false,
          tabBarPosition: 'bottom',
          lazy: true,
          navigationOptions: {
            tabBarVisible: false
          }
        }
      );


    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
