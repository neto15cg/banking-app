import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthInitial from '../screens/auth';
import Login from '../screens/auth/login';

const AuthStack = createStackNavigator(
  {
    AuthInitial,
    Login,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: 'AuthInitial',
  }
);

const AppSwitch = createSwitchNavigator(
  {
    AuthStack,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: 'AuthStack',
  }
);
export default createAppContainer(AppSwitch);
