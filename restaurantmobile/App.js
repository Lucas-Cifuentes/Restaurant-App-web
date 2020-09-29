import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';

import ButtonResume from './src/components/ButtonResume';

import FirebaseState from './src/context/firebase/firebaseState';
import OrdersState from './src/context/orders/ordersState';

import NewOrder from './src/views/NewOrder';
import Menu from './src/views/Menu';
import FormDish from './src/views/FormDish';
import DetailsDish from './src/views/DetailsDish';
import OrderProgress from './src/views/OrderProgress';
import OrderResume from './src/views/OrderResume';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <FirebaseState>
        <OrdersState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFDA00',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}>
              <Stack.Screen
                name="NewOrder"
                component={NewOrder}
                options={{
                  title: 'New Order',
                  headerTitleStyle: {textAlign: 'center'},
                }}
              />
              <Stack.Screen
                name="DetailsDish"
                component={DetailsDish}
                options={{title: 'Details'}}
              />
              <Stack.Screen
                name="OrderProgress"
                component={OrderProgress}
                options={{title: 'Order Progress'}}
              />
              <Stack.Screen
                name="FormDish"
                component={FormDish}
                options={{title: 'Order Dish'}}
              />
              <Stack.Screen
                name="OrderResume"
                component={OrderResume}
                options={{title: 'Order'}}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{headerRight: (props) => <ButtonResume />}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrdersState>
      </FirebaseState>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
