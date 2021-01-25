/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import CoinsStack from './src/components/coins/CoinsStack';

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <CoinsStack />
    </NavigationContainer>
  );
};

export default App;
