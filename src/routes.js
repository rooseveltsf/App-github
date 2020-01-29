import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator(
  {
    Main,
    User,
  },
  {
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#0468BF',
      },
      headerTintColor: '#fff',
    },
  },
);
const Routes = createAppContainer(Stack);

export default Routes;
