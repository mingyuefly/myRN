import React from 'react';
import { View, Text, Button, Image, Platform} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';
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
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle:<LogoTitle />,
      headerLeft:(
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      ),
      headerRight:(
        <Button 
          onPress = {navigation.getParam('increaseCount')}
          title = '+1'
          color = {Platform.OS === 'ios'?'#fff':null}
        />
      ),
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({increaseCount:this._increaseCount});
  }

  state = {
    count:0,
  };

  _increaseCount = () => {
    this.setState({count:this.state.count + 1});
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>Count:{this.state.count}</Text>
        <Button title = 'Go to Details' onPress = {()=>this.props.navigation.navigate('Details', {itemId:86, otherParam:'First Details',})} />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;
    return {
      title:params?params.otherParam:'A Nested Details Screen',
      headerStyle:{
        backgroundColor:navigationOptions.headerTintColor,
      },
      headerTintColor:navigationOptions.headerStyle.backgroundColor,
    };
  };
  render() {
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;
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

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

const MainStack = createStackNavigator(
  {
    Home:{
      screen:HomeScreen,
    },
    Details:{
      screen:DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main:{
      screen:MainStack,
    },
    MyModal:{
      screen:ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
