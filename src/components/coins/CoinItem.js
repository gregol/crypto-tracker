import React from 'react';
import {Text, Pressable, View, StyleSheet, Image} from 'react-native';
import {colors} from '../../res/colors';

function CoinItem({item, onPress}) {
  const getImageArrow = () => {
    return item.percent_change_1h > 0
      ? require('../../assets/arrow_up.png')
      : require('../../assets/arrow_down.png');
  };
  return (
    <Pressable onPress={onPress}>
      <View style={style.coinItemContainer}>
        <View style={style.row}>
          <Text style={style.coinSymbol}>{item.symbol}</Text>
          <Text
            style={style.coinText}>{`${item.name} $${item.price_usd}`}</Text>
        </View>
        <View style={style.row}>
          <Text style={style.percent}>{item.percent_change_1h}</Text>
          <Image style={style.arrows} source={getImageArrow()} />
        </View>
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  coinItemContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomColor: colors.zircon,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinSymbol: {
    color: colors.textTitles,
    fontSize: 14,
    fontWeight: 'bold',
  },
  coinText: {
    marginLeft: 10,
    padding: 2,
    color: '#C792EA',
  },
  percent: {
    color: '#FFF',
    marginRight: 10,
  },
  arrows: {
    width: 18,
    height: 18,
  },
});

export default CoinItem;
