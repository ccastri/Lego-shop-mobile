import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectBasketItems } from './features/basketSlice';
import { setProducts } from './features/productSlice';
import BasketScreen from './screens/BasketScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import SignUpScreen from './screens/SignUpScreen';



const Stack = createNativeStackNavigator();


export default function AppWrapper({ products }) {
  const dispatch = useDispatch()
  // console.log(products)



  useEffect(() => {
    dispatch(setProducts(products))
    // dispatch(selectBasketItems(products))

  }, [products])

  return (
    <>
      <NavigationContainer>
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            // initialParams={{ products: products }}
            // products={products}
            options={{ headerShown: false }}
          />
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
      </NavigationContainer>


    </>
  );
}

