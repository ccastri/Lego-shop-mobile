import * as React from 'react';
import { Image, SafeAreaView, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
// TODO:
// import useAuth, { AuthProvider } from './hooks/useAuth';
import { store } from './store';
import { Provider } from 'react-redux'
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/ProductScreen';
import useToggle, { ToggleProvider } from './hooks/useToggle';
import BasketScreen from './screens/BasketScreen';



const Stack = createNativeStackNavigator();


export default function App() {
  const { toggle } = useToggle()
  // const { user } = useAuth()
  return (
    <>



      <NavigationContainer>
        <Provider store={store}>
          <ToggleProvider>
            <Stack.Navigator>
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                  headerShown: false
                }}

              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerShown: false
                }}

              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false
                }} />
              <Stack.Screen
                name="Product"
                component={ProductScreen}
                options={{ presentation: 'modal', headerShown: false }}
              />
              <Stack.Screen
                name="Basket"
                component={BasketScreen}
                options={{ presentation: 'modal', headerShown: false }}
              />
            </Stack.Navigator>
          </ToggleProvider>
        </Provider>
      </NavigationContainer>
    </>
  );
}

