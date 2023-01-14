import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';

import { Auth, Chat, Main, User } from '@src/views';
import { Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

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

  return <NavigationContainer theme={navigationTheme}>{user.seq ? <LoginedNavi /> : <NonLoginedNavi />}</NavigationContainer>;
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
const LoginedNavi = () => {
  const navigation = useNavigation();

  const PAGES = [
    {
      name: 'Main',
      component: Main,
      options: {
        tabBarIcon: ({ focused }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('Main');
              }}
            >
              <FastImage
                style={styles.tabIcon}
                source={focused ? require('@assets/image/tab/home_active.png') : require('@assets/image/tab/home.png')}
              />
            </Pressable>
          );
        },
      },
    },
    {
      name: 'Chat',
      component: Chat,
      options: {
        tabBarIcon: ({ focused }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('Chat');
              }}
            >
              <FastImage
                style={styles.tabIcon}
                source={focused ? require('@assets/image/tab/chat_active.png') : require('@assets/image/tab/chat.png')}
              />
            </Pressable>
          );
        },
      },
    },
    {
      name: 'User',
      component: User,
      options: {
        tabBarIcon: ({ focused }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('User');
              }}
            >
              <FastImage
                style={styles.tabIcon}
                source={focused ? require('@assets/image/tab/user_active.png') : require('@assets/image/tab/user.png')}
              />
            </Pressable>
          );
        },
      },
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: '',
        headerStyle: { elevation: 0, shadowOpacity: 0 },
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      {PAGES.length > 0 &&
        PAGES.map(({ name, component, options }) => {
          return <Tab.Screen key={name} name={name} component={component} options={options} />;
        })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 28,
    aspectRatio: 1,
  },
});

export default AppIndex;
