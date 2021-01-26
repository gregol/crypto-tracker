import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  SectionList,
  FlatList,
} from 'react-native';
import axios from 'axios/index';

import CoinMarketItem from './CoinMarketItem';
import {colors} from '../../res/colors';
import Http from '../../libs/http';

const CoinDetailScreen = (props) => {
  const [coin, setCoin] = useState({});
  const [bsf, setBsf] = useState(0);
  const [loading, setLoading] = useState(false);
  const [markets, setMarkets] = useState([]);

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

    const market = await Http.instance.get(url);

    setMarkets(market);
  };
  useEffect(() => {
    console.log(props.route.params.coin);
    setLoading(true);
    setCoin(props.route.params.coin);
    props.navigation.setOptions({title: coin.symbol});
    getBssPrice(props.route.params.coin?.price_usd);
    getMarkets(props.route.params.coin.id);
    setLoading(false);
  }, []);

  async function getBssPrice(usd_price) {
    try {
      let req = await axios
        .get('https://s3.amazonaws.com/dolartoday/data.json')
        .then((dolar) => {
          let {data} = dolar;

          console.log(BsPrice);
          return data;
        });
      let BsPrice = parseFloat(req?.USD?.sicad1 * usd_price).toFixed(2);
      setBsf(BsPrice);
      return req;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  const getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      let url = `https://coinlore.com/img/25x25/${coinNameId}.png`;
      return url;
    }
  };

  const gatSections = (coins) => {
    const sections = [
      {
        title: 'Precio en dolares',
        data: [
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(coin.price_usd),
        ],
      },
      {
        title: 'Precio en Bolivares (TASA BCV)',
        data: [
          new Intl.NumberFormat('ve-VE', {
            style: 'currency',
            currency: 'BSF',
          }).format(bsf),
        ],
      },
      {
        title: 'Market cap',
        data: [
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(coin.market_cap_usd),
        ],
      },
      {
        title: 'Volumen en 24h',
        data: [
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(coin.volume24),
        ],
      },
      {
        title: 'Change in 24h',
        data: [
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(coin.percent_change_24h),
        ],
      },
    ];
    return sections;
  };

  if (loading) {
    return <ActivityIndicator color={colors.textSubTitles} size="large" />;
  }
  return (
    <View style={style.container}>
      <View style={style.coinHeader}>
        <Image
          style={style.coinLogo}
          source={{uri: getSymbolIcon(coin.nameid)}}
        />
        <Text style={style.coinName}>{coin.name}</Text>
      </View>
      <SectionList
        style={style.sectionsList}
        sections={gatSections(coin)}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <View style={style.sectionHeaer}>
            <Text style={style.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={style.section}>
            <Text style={style.sectiontext}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={style.marteSubtitle}>Markets</Text>
      <FlatList
        style={style.marketList}
        horizontal={true}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackPearl,
  },
  coinHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderColor: colors.blackPearl,
    borderBottomColor: colors.zircon,
    borderWidth: 1,
  },
  coinLogo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  coinName: {
    color: colors.textSubTitles,
    fontSize: 26,
  },
  sectionsList: {
    maxHeight: 240,
  },
  marketList: {
    maxHeight: 100,
  },
  sectionHeaer: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectiontext: {
    color: colors.textTitles,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marteSubtitle: {
    backgroundColor: colors.textSubTitles,
    color: colors.white,
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
  },
});
export default CoinDetailScreen;
