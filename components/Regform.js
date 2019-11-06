import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Navigator,
  KeyboardAvoidingView
} from 'react-native';
const util = require('util')
import * as firebase from 'firebase'; 
const firebaseConfig = {
  apiKey: "AIzaSyDKBt0M2v4xL-DaDLxIBKsk0rEAhBjKRl0",
  authDomain: "grade-calculator-5e350.firebaseapp.com",
  databaseURL: "https://grade-calculator-5e350.firebaseio.com",
  projectId: "grade-calculator-5e350",
  storageBucket: "grade-calculator-5e350.appspot.com",
  messagingSenderId: "717156731074",
  appId: "1:717156731074:web:e9f5eac0d1ac7ce7"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Reform extends React.Component{
    static navigationOptions = {
    title: 'Register'
  }; 
  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  signUpUser = (email,password) =>{
    try {
      if (this.state.password.length < 6){
        alert("Password must be at least 6 characters long.")
        return; 
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch (error){
      console.log(error.toString())
    }
  }
  render(){
    return(
      <KeyboardAvoidingView behavior="padding" style = {styles.container}>
        <Text style = {styles.header}>Registration</Text>

        <TextInput style = {styles.textinput} placeholder = "Your email"
        underlineColorAndroid = {'transparent'}
        onChangeText={(email) => this.setState({email})} />

        <TextInput style = {styles.textinput} placeholder = "Your Password"
        secureTextEntry = {true} underlineColorAndroid = {'transparent'} 
        onChangeText={(password) => this.setState({password})}/>

        <TouchableOpacity 
          style = {styles.button}
          onPress={()=> this.signUpUser(this.state.email, this.state.password)}
          >
          <Text style = {styles.btntext}>Sign Up</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
      fontSize: 24,
      color: '#fff',
      paddingBottom: 10,
      marginBottom: 40,
      borderBottomColor: '#199187',
      borderBottomWidth: 1,

  },
  textinput: {
      alignSelf: 'stretch',
      height: 40,
      marginBottom: 30,
      color: '#fff',
      borderBottomColor: '#f8f8f8',
      borderBottomWidth: 1,
  },
  button: {
      alignSelf: 'stretch',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#59cbbd',
      marginTop: 30,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#36485f',
      paddingLeft: 60,
      paddingRight: 60,
  },
});
