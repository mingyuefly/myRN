import React from 'react';
import { View, Text, Button, Image} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
//import console = require('console');
//import console = require('console');

class LogoTitle extends React.Component {
  render() {
    return (
      <Image 
        source = {require('./spiro.png')}
        style = {{width:30, height:30}}
      />
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle:<LogoTitle />,
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title = 'Go to Details' onPress = {()=>this.props.navigation.navigate('Details', {itemId:86, otherParam:'anything you want here'})} />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    //console.log(navigationOptions);
    return {
      title:navigation.getParam('otherParam', 'A Nested Details Screen'),
      headerStyle:{
        backgroundColor:navigationOptions.headerTintColor,
      },
      headerTintColor:navigationOptions.headerStyle.backgroundColor,
    };
  };
  render() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>ItemId:{JSON.stringify(itemId)}</Text>
        <Text>otherParam:{JSON.stringify(otherParam)}</Text>
        <Button title = 'Go to Details...again' onPress = {()=>this.props.navigation.push('Details', {itemId:Math.floor(Math.random() * 100)})} />
        <Button title = 'Update the title' onPress = {() => this.props.navigation.setParams({otherParam:'Updated!'})} />
        <Button title = 'Go to home' onPress = {() => this.props.navigation.navigate('Home')} />
        <Button title = 'Go back' onPress = {() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName:'Home',
    defaultNavigationOptions:{
      headerStyle:{
        backgroundColor:'#f4511e',
      },
      headerTintColor:'#ffffff',
      headerTitleStyle:'bold',
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
