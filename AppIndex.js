import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';

import { Auth, Chat, Heart, Main, User } from '@src/views';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, FONT_SIZE, hp, wp } from '@src/assets/style/theme';
import { Modal, ToastMessage } from '@src/components';
import { modalSlice, toastMessageSlice } from '@src/slices';
import { empty, wait } from '@src/utils';

import Reactotron from 'reactotron-react-native';
import { request } from '@src/apis';
import { useErrorHandler } from 'react-error-boundary';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    color: '#000',
    background: COLORS.bg,
  },
};

function AppIndex() {
  const dispatch = useDispatch();

  const { user, modal, toastMessage } = useSelector((state) => {
    return state;
  });

  const handleError = useErrorHandler();

  React.useEffect(() => {
    (async () => {})();
  }, []);

  /**
   * 로그인 처리
   */
  React.useEffect(() => {
    if (empty(user.seq)) {
      return;
    }

    dispatch(toastMessageSlice.actions.show('로그인 되었습니다'));
  }, [dispatch, user.seq]);

  return (
    <NavigationContainer theme={navigationTheme}>
      {user.seq ? <LoginedNavi /> : <NonLoginedNavi />}

      {toastMessage.show && <ToastMessage message={toastMessage.message} />}

      {modal.code && (
        <Modal
          confirm
          modalVisible={true}
          title={modal.title}
          subTitle={modal.subTitle}
          _permission={() => {
            dispatch(modalSlice.actions.hide());
          }}
        />
      )}
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
      name: 'Heart',
      component: Heart,
      options: {
        tabBarIcon: ({ focused }) => {
          const name = focused ? 'heart' : 'hearto';

          return (
            <Pressable
              onPress={() => {
                navigation.navigate('Heart');
              }}
            >
              <Text>
                <AntDesign name={name} size={wp('6.25%')} />
              </Text>
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
        tabBarBadgeStyle: {},
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: hp('11%'),
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
    width: wp('7%'),
    aspectRatio: 1,
  },
});

export default AppIndex;
