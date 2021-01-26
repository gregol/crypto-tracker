import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../../res/colors';
function CoinMarketItem({item}) {
  console.log(item);
  return (
    <View style={style.container}>
      <Text style={style.itenName}>{item.name}</Text>
      <Text style={style.priceName}>{item.price}</Text>
      <Text style={style.itenName}>{item.price_usd}</Text>
      <Text style={style.itenQuote}>{item.quote}</Text>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: colors.blackPearl,
    borderBottomColor: colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginRight: 0,
    alignItems: 'center',
  },
  priceName: {
    color: colors.purple,
  },
  itenQuote: {
    color: colors.yellow,
  },
  itenName: {
    color: '#FFF',
  },
});
export default CoinMarketItem;
