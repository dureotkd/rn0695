import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { Auth } from '@src/views';
import { BottomSheet } from '@src/components';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { bottomSheetSlice } from '@src/slices';

import { wait } from '@src/utils';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    color: '#000',
    background: '#f0e7db',
  },
};

function AppIndex() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => {
    return state;
  });

  return (
    <NavigationContainer theme={navigationTheme}>
      <NonLoginedNavi />
    </NavigationContainer>
  );
}

/**
 * 비로그인 네비게이션
 */
const NonLoginedNavi = () => {
  const { PAGES, GROUP_PAGES } = {
    PAGES: [
      {
        name: 'Auth',
        component: Auth,
        options: {
          headerShown: false,
        },
      },
    ],
    GROUP_PAGES: [
      // {
      //   screenOptions: {
      //     headerTitle: '',
      //     headerShown: false,
      //   },
      //   pages: [
      //     {
      //       name: 'Auth',
      //       component: A,
      //       options: {},
      //     },
      //   ],
      // },
    ],
  };

  const dispatch = useDispatch();
  const { bottomSheet } = useSelector((state) => {
    return state;
  });

  const [modaldVisible, setModaldVisible] = React.useState(true);
  const [bottomSheetDown, setBottomSheetDown] = React.useState(false);

  return (
    <Stack.Navigator>
      {PAGES.length > 0 &&
        PAGES.map(({ name, component, options }) => {
          return <Stack.Screen key={name} name={name} component={component} options={options} />;
        })}

      {GROUP_PAGES.length > 0 &&
        GROUP_PAGES.map(({ screenOptions, pages }, index) => {
          return (
            <Stack.Group key={index} screenOptions={screenOptions}>
              {pages.map(({ name, component, options }) => {
                return <Stack.Screen key={name} name={name} component={component} options={options} />;
              })}
            </Stack.Group>
          );
        })}
    </Stack.Navigator>
  );
};

/**
 * 로그인 네비게이션
 */
// const LoginedNavi = () => {
//   const PAGES = [
//     {
//       name: 'HOME',
//       component: A,
//       options: {
//         tabBarIcon: () => {},
//       },
//     },
//   ];

//   return (
//     <Tab.Navigator>
//       {PAGES.length > 0 &&
//         PAGES.map(({ name, component, options }) => {
//           return <Tab.Screen key={name} name={name} component={component} options={options} />;
//         })}
//     </Tab.Navigator>
//   );
// };

export default AppIndex;
