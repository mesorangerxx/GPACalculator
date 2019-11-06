import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loginform from './components/loginform';
import Regform from './components/Regform.js';
import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  First: {screen: Loginform},
  Second:{screen: Regform}
});

const App = createAppContainer(MainNavigator);


class LoginFm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Loginform />
      </View>
    );
  }
}

class RegFm extends React.Component{ 
   render() {
    return (
      <View style={styles.container}>
        <Regform />
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#36485f',
      paddingLeft: 60,
      paddingRight: 60,
  },
});

export default App;
