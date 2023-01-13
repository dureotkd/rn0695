import { userSlice } from './src/slices';
import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
function AppIndex() {
  const dispatch = useDispatch();

  useSelector((state) => {
    console.log(state.user);
  });

  return (
    <NavigationContainer>
      {/* <Pressable
        onPress={() => {
          dispatch(
            userSlice.actions.set({
              name: 'zz',
            }),
          );
        }}
      >
      </Pressable> */}
      <NonLoginedNavi />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const A = () => {
  return (
    <OnBoardingLayout>
      <Text style={{ color: '#000' }}>aaafasffsssaf</Text>
    </OnBoardingLayout>
  );
};

const NonLoginedNavi = () => {
  const { PAGES, GROUP_PAGES } = {
    PAGES: [
      // {
      //   name: 'Auth4',
      //   component: A,
      //   options: {
      //     headerTitle: '',
      //   },
      // },
    ],
    GROUP_PAGES: [
      {
        screenOptions: {
          headerTitle: '',
          headerShown: false,
        },
        pages: [
          {
            name: 'Auth',
            component: A,
            options: {},
          },
          {
            name: 'Auth1',
            component: A,
            options: {},
          },
        ],
      },
    ],
  };

  return (
    <Stack.Navigator>
      {PAGES.length > 0 &&
        PAGES.map(({ name, component, options }) => {
          return <Stack.Screen name={name} component={component} options={options} />;
        })}

      {GROUP_PAGES.length > 0 &&
        GROUP_PAGES.map(({ screenOptions, pages }) => {
          return (
            <Stack.Group screenOptions={screenOptions}>
              {pages.map(({ name, component, options }) => {
                return <Stack.Screen name={name} component={component} options={options} />;
              })}
            </Stack.Group>
          );
        })}
    </Stack.Navigator>
  );
};

const LoginedNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Auth22"
          component={(() => (
            <View>
              <Text>LoginedNavi</Text>
            </View>
          ))()}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const OnBoardingLayout = ({ children }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export default AppIndex;
