import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from './CoinDetailScreen';
import {colors} from '../../res/colors';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
        },
        headerTintColor: colors.textTitles,
      }}>
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="CoinsDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default CoinsStack;
