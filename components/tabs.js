import React from 'react';
import {
  AppRegistry,
  Button,
  FlatList,
  Image,
  Platform,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Theme, { createTheme, createStyle, createThemedComponent } from 'react-native-theming';

import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

const themes = [
  createTheme({
    backgroundColor: 'white',
    textColor: 'black',
    buttonColor: 'blue',
    buttonText: 'white',
    //icon: require('./icons/default.png'),
    statusBar: 'dark-content',
  }, 'Light'),
  createTheme({
    backgroundColor: 'black',
    textColor: 'white',
    buttonColor: 'yellow',
    buttonText: 'black',
    //icon: require('./icons/colorful.png'),
    statusBar: 'light-content',
  }, 'Dark'),
];

const styles1 = createStyle({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '@backgroundColor',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '@textColor',
  },
  instructions: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 5,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '@buttonColor',
    borderRadius: 3,
    flex: 1,
    alignItems: 'center',
  },
  genericButton: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 14,
  },
});

const TButton = createThemedComponent(TouchableOpacity);
const Bar = createThemedComponent(StatusBar, ['barStyle', 'backgroundColor']);

class GPAScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      grade1: '',
      grade2: '',
      grade3: '',
      grade4: '',
      classes: '',
      gcalc: 0
    };
  }

  buttonPressed = () => {
    const { grade1, grade2, grade3, grade4, classes } = this.state;
    this.setState({
      gcalc: ((Number(grade1) + Number(grade2) + Number(grade3) + Number(grade4)) / Number(classes))
    });
  }

  nightMode = () => {
    this.setState({backgroundColor : '#000000'});
  }
  render() {
    return (
      <ScrollView>
      <Theme.View style={styles1.container}>
      <View style={{padding: 10}}>
      <TextInput
        style={{height: 40,
        width: 90}}
        placeholder="Type notes here!"
        //onChangeText={(text) => this.setState({text})}
      />
      </View>
        <Bar barStyle="@statusBar" backgroundColor="@backgroundColor" />
        <Theme.Image source="@icon" />
        <Theme.Text style={styles1.welcome}>
          GPA Calculator
        </Theme.Text>
        <Text style={styles1.instructions}>
        Use this calculator to determine your total GPA!
        </Text>

          <View style={{ flexDirection: 'row' }}>
          <Theme.Text style={styles1.welcome}>
            Enter Grade 1
          </Theme.Text>
          <TextInput
            style={{
              height: 40,
              width: 80,
              borderWidth: 1}}
            placeholder="(e.g. 3.0)"
            keyboardType ='numeric'
            onChangeText={(grade1) => this.setState({grade1})}
          />
          </View>
          <View style={{ flexDirection: 'row' }}>
          <Theme.Text style={styles1.welcome}>
            Enter Grade 2
          </Theme.Text>
          <TextInput
            style={{
              height: 40,
              width: 80,
              borderWidth: 1}}
            placeholder="(e.g. 3.0)"
            keyboardType ='numeric'
            onChangeText={(grade2) => this.setState({grade2})}
          />
          </View>
          <View style={{ flexDirection: 'row' }}>
          <Theme.Text style={styles1.welcome}>
            Enter Grade 3
          </Theme.Text>
          <TextInput
            style={{
              height: 40,
              width: 80,
              borderWidth: 1}}
            placeholder="(e.g. 3.0)"
            keyboardType ='numeric'
            onChangeText={(grade3) => this.setState({grade3})}
          />
          </View>
          <View style={{ flexDirection: 'row' }}>
          <Theme.Text style={styles1.welcome}>
            Enter Grade 4
          </Theme.Text>
          <TextInput
            style={{
              height: 40,
              width: 80,
              borderWidth: 1}}
            placeholder="(e.g. 3.0)"
            keyboardType ='numeric'
            onChangeText={(grade4) => this.setState({grade4})}
          />
          </View>

          <View style={{ flexDirection: 'row' }}>

          <Theme.Text style={styles1.welcome}>
            Enter Number of Classes
          </Theme.Text>
          <TextInput
            style={{height: 40,
            width: 80,
            borderWidth: 1}}
            placeholder="(e.g. 4)"
            keyboardType ='numeric'
            onChangeText={(classes) => this.setState({classes})}
          />
          </View>


          <View style={{ flexDirection: 'row' }}>

          <Button title={"Compute"} onPress={this.buttonPressed}/>
          </View>
          <View style={{ flexDirection: 'row' }}>

          <Theme.Text style ={styles1.welcome}>{`Your total GPA is ${this.state.gcalc.toFixed(2)} `}</Theme.Text>
          </View>

          <View style={{ flexDirection: 'row' }}>

          <FlatList
            data={[
              {key: this.state.gcalc.toFixed(2)},
            ]}
            renderItem={({item}) => <Theme.Text style={styles1.welcome}>{item.key}</Theme.Text>}
          />

        </View>

        <View style={{ flexDirection: 'row' }}>
          { themes.map(theme => (
            <TButton key={theme.name} style={[styles1.button, styles1.genericButton]} onPress={() => theme.apply()}>
              <Theme.Text style={[styles1.buttonText, { color: '@buttonText' }]}>{theme.name}</Theme.Text>
            </TButton>
            ))
          }
          </View>
      </Theme.View>
      </ScrollView>


    );
  }
}

class NewScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>New!</Text>
        <Button
          title="Go to Edited"
          onPress={() => this.props.navigation.navigate('Edited')}
        />
        <Button
          title="Go to Previous Calculations"
          onPress={() => this.props.navigation.navigate('Previous')}
        />
      </View>
    );
  }
}

class FinalGradeScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      grade: '',
      desired: '',
      final: '',
      calc: 0
    };
  }

  buttonPressed = () => {
    const { grade, desired, final } = this.state;
    this.setState({
      //calc: ( Number(desired) - ((Number( 1 - final)) * Number(grade))) / Number(final)
      calc: ((Number(desired)/100) - ((1 - (Number(final)/100)) * (Number(grade)/100))) / (Number(final)/100) * 100
    });
  }

  nightMode = () => {
    this.setState({backgroundColor : '#000000'});
  }

  render() {
    return (

      /*<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Edited!</Text>
        <Button
          title="Go to New"
          onPress={() => this.props.navigation.navigate('New')}
        />
        <Button
          title="Go to Previous Calculations"
          onPress={() => this.props.navigation.navigate('Previous')}
        />
      </View>*/
      <ScrollView>
      <Theme.View style={styles1.container}>
        <Bar barStyle="@statusBar" backgroundColor="@backgroundColor" />
        <Theme.Image source="@icon" />
        <Theme.Text style={styles1.welcome}>
          Final Grade Calculator
        </Theme.Text>
        <Text style={styles1.instructions}>
        Use this calculator to determine what grade you need on your final exam in order to get a desired grade in a class.
        </Text>

          <View style={{ flexDirection: 'row' }}>
          <Theme.Text style={styles1.welcome}>
            Enter Current Grade %
          </Theme.Text>
          <TextInput
            style={{
              height: 40,
              width: 80,
              borderWidth: 1}}
            placeholder="(e.g. 87.3)"
            keyboardType ='numeric'
            onChangeText={(grade) => this.setState({grade})}
          />
          </View>

          <View style={{ flexDirection: 'row' }}>

          <Theme.Text style={styles1.welcome}>
            Enter Desired Grade %
          </Theme.Text>
          <TextInput
            style={{height: 40,
            width: 80,
            borderWidth: 1}}
            placeholder="(e.g. 95)"
            keyboardType ='numeric'
            onChangeText={(desired) => this.setState({desired})}
          />
          </View>

          <View style={{ flexDirection: 'row' }}>

          <Theme.Text style={styles1.welcome}>
            Enter Final %
          </Theme.Text>
          <TextInput
            style={{height: 40,
            width: 80,
            borderWidth: 1}}
            placeholder="(e.g. 20)"
            keyboardType ='numeric'
            onChangeText={(final) => this.setState({final})}
          />
          </View>
          <View style={{ flexDirection: 'row' }}>

          <Button title={"Compute"} onPress={this.buttonPressed}/>
          </View>
          <View style={{ flexDirection: 'row' }}>

          <Theme.Text style ={styles1.welcome}>{`You need a ${this.state.calc.toFixed(2)}% on the final`}</Theme.Text>
          </View>

          <View style={{ flexDirection: 'row' }}>

          <FlatList
            data={[
              {key: this.state.calc.toFixed(2)},
            ]}
            renderItem={({item}) => <Theme.Text style={styles1.welcome}>{item.key}</Theme.Text>}
          />

        </View>
        <View style={{ flexDirection: 'row' }}>
          { themes.map(theme => (
            <TButton key={theme.name} style={[styles1.button, styles1.genericButton]} onPress={() => theme.apply()}>
              <Theme.Text style={[styles1.buttonText, { color: '@buttonText' }]}>{theme.name}</Theme.Text>
            </TButton>
            ))
          }
          </View>
      </Theme.View>
      </ScrollView>


    );
  }
}

class PreviousScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Previous Calculations!</Text>
      </View>
    );
  }
}
const GPAStack = createStackNavigator({
  GPA: { screen: GPAScreen },
  Previous: { screen: PreviousScreen },
});

const NewStack = createStackNavigator({
  New: { screen: NewScreen },
  Previous: { screen: PreviousScreen },
});

const FinalGradeStack = createStackNavigator({
  FinalGrade: { screen: FinalGradeScreen },
  Previous: { screen: PreviousScreen },
});

export default createAppContainer(createBottomTabNavigator(
  {
    GPA: {screen: GPAStack },
    New: { screen: NewStack },
    FinalsCalc: { screen: FinalGradeStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'New') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'FinalsCalc') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
));

// skip this line if using Create React Native App
//AppRegistry.registerComponent('gpa-calc', () => Bananas);