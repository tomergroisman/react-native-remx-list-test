import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserListDumb} from './screens/user-list-dumb';
import {UserById} from './screens/user-by-id';
import {HomeScreen} from './screens/home';
import {UserListSmart} from './screens/user-list-smart';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="UserListDumb"
          component={UserListDumb}
          options={{title: 'Dumb User List'}}
        />
        <Stack.Screen
          name="UserListSmart"
          component={UserListSmart}
          options={{title: 'Smart User List'}}
        />
        <Stack.Screen
          name="UserById"
          component={UserById}
          options={{title: 'User by Id'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
