import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';

import { Auth, Chat, Heart, Main, User } from '@src/views';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, FONT_SIZE, hp, wp } from '@src/assets/style/theme';
import { BottomSheet, Modal, ToastMessage } from '@src/components';
import { bottomSheetSlice, modalSlice, toastMessageSlice, userSlice } from '@src/slices';

import { apiErrorHandler, request } from '@src/apis';
import PageLoading from '@src/components/PageLoading';
import { wait } from '@src/utils';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    color: '#000',
    background: COLORS.bg,
    backgroundColor: COLORS.bg,
  },
};

function AppIndex() {
  const dispatch = useDispatch();

  const { user, modal, toastMessage } = useSelector((state) => {
    return state;
  });

  const { loading } = 로그인처리Hook();

  // if (loading) {
  //   return <PageLoading />;
  // }

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

  const { searchSecondText } = 자동매칭타임Hook();

  const { socketObj } = 자동매치Hook();

  const { bottomSheet } = useSelector((state) => {
    return state;
  });

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
    <React.Fragment>
      <Tab.Navigator
        screenOptions={{
          headerTitle: '',
          headerStyle: { elevation: 0, shadowOpacity: 0 },
          tabBarShowLabel: false,
          tabBarBadgeStyle: {},
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
          },
          headerLeft: () => {
            return (
              <View style={{ paddingHorizontal: 14 }}>
                <Text>군개팅 - 로고</Text>
              </View>
            );
          },
          headerRight: () => {
            return (
              <View style={{ paddingHorizontal: 14 }}>
                <Text style={{ fontSize: FONT_SIZE.sm, fontWeight: '500' }}>{searchSecondText}</Text>
              </View>
            );
          },
        }}
      >
        {PAGES.length > 0 &&
          PAGES.map(({ name, component, options }) => {
            return <Tab.Screen key={name} name={name} component={component} options={options} />;
          })}
      </Tab.Navigator>
      {
        {
          M01: (
            <BottomSheet modalVisible={true}>
              <View>
                <Text>aa</Text>
              </View>
            </BottomSheet>
          ),
        }[bottomSheet.code]
      }
    </React.Fragment>
  );
};

const 로그인처리Hook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      const {
        data: { loginUser },
      } = await request
        .post('/login')
        .then((res) => res)
        .catch(() => {
          setLoading((prev) => !prev);
          apiErrorHandler(dispatch);
        });

      setLoading((prev) => !prev);

      if (!loginUser) {
        return;
      }

      dispatch(
        userSlice.actions.login({
          loginUser: loginUser,
        }),
      );

      dispatch(toastMessageSlice.actions.show('로그인 되었습니다'));
    })();
  }, [dispatch]);

  return { loading };
};

const 자동매치Hook = () => {
  const dispatch = useDispatch();

  const [socketObj, setSocketObj] = React.useState({});

  const {
    autoMatch: { start },
  } = useSelector((state) => {
    return state;
  });

  React.useEffect(() => {
    console.log('zz');
  }, []);

  React.useEffect(() => {
    if (!start) {
      return;
    }

    // (async () => {
    //   dispatch(
    //     bottomSheetSlice.actions.set({
    //       show: true,
    //       code: 'M01',
    //       options: {
    //         height: 300,
    //       },
    //     }),
    //   );
    // })();
  }, [dispatch, start]);

  return { socketObj };
};

const 자동매칭타임Hook = () => {
  let [searchSecond, setSearchSecond] = React.useState(1);
  let [searchSecondText, setSearchSecondText] = React.useState('00:00');
  let [searchInterval, setSearchInterval] = React.useState({});

  const dispatch = useDispatch();

  const { autoMatch } = useSelector((state) => {
    return state;
  });

  const 자동매칭 = React.useCallback(() => {
    if (autoMatch.start) {
      const interval = setInterval(() => {
        const timmerArr = searchSecondText.split(':');
        const nowDate = new Date('2022', '07', '06', '1', timmerArr[0], timmerArr[1] + searchSecond);
        let newMin = nowDate.getMinutes();
        let newSec = nowDate.getSeconds();
        if (newMin < 10) {
          newMin = `0${newMin}`;
        }
        if (newSec < 10) {
          newSec = `0${newSec}`;
        }
        setSearchSecond(searchSecond++);
        setSearchSecondText(`${newMin}:${newSec}`);
      }, 1000);
      setSearchInterval(interval);
    } else {
      clearInterval(searchInterval);
      setSearchInterval({});
      setSearchSecond(1);
      setSearchSecondText('00:00');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, autoMatch.start]);

  React.useEffect(() => {
    자동매칭();
  }, [자동매칭]);

  return { searchSecondText };
};

const styles = StyleSheet.create({
  tabIcon: {
    width: wp('7%'),
    aspectRatio: 1,
  },
});

export default AppIndex;
