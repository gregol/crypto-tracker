import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import Http from '../../libs/http';
import CoinItem from './CoinItem';
import {colors} from '../../res/colors';
// class CoinsScreen extends Component {

function CoinsScreen(props) {
  const [coins, setCouins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCoins();
  }, []);
  const fetchCoins = async () => {
    setLoading(true);
    const coinsData = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    setCouins(coinsData);
    setLoading(false);
  };
  const handlePress = (coin) => {
    props.navigation.navigate('CoinsDetail', {coin});
  };

  if (loading) {
    return <ActivityIndicator color="#23465B" size="large" />;
  }
  return (
    <View style={style.container}>
      <Text style={style.titleText}>Coins List</Text>
      <FlatList
        data={coins.data}
        renderItem={({item}) => (
          <CoinItem item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05192D',
  },
  titleText: {
    color: colors.textSubTitles,
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },
  btn: {
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#0791E6',
    textAlign: 'center',
  },
});

export default CoinsScreen;
