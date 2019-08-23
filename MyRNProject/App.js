import React from 'react';
import { View, Text, Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button title = 'Go to Details' onPress = {()=>this.props.navigation.navigate('Details')} />
      </View>
    );
  }
}

// 从DetailsScreen继续进入DetailsScreen页面，如果使用navigate啥也不会做，因为此时已经在Details这个路由上了，如果要继续添加这个页面，则需要是用push方法
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title = 'Go to Details...again' onPress = {()=>this.props.navigation.push('Details')} />
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
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
