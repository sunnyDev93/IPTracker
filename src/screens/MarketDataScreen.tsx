import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { connectWebSocket } from '../services/connectWebSocket';
import { WEBSOCKET_URL } from '../constants/api';
import theme from '../styles/theme';

const MarketDataScreen: React.FC = () => {
  const [price, setPrice] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<number[]>([]);

  useEffect(() => {
    const ws = connectWebSocket(WEBSOCKET_URL, (message) => {
      if (message.e === 'aggTrade') {
        const newPrice = parseFloat(message.p);
        setPrice(message.p);
        setPriceData((prevData) => {
          const newData = [...prevData, newPrice];
          if (newData.length > 20) newData.shift();
          return newData;
        });
      }
    });

    return () => {
      ws.close();
    };
  }, []);

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container} testID="market-data">
      <View style={styles.chartContainer}>
       <LineChart
          data={{
            labels: priceData.map((_, index) => index.toString()),
            datasets: [
              {
                data: priceData,
              },
            ],
          }}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={{
            backgroundColor: theme.colors.background,
            backgroundGradientFrom: theme.colors.background,
            backgroundGradientTo: theme.colors.background,
            color: (opacity = 1) => theme.colors.primary,
            labelColor: (opacity = 1) => theme.colors.text,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {priceData.map((p, index) => (
          <Text key={index} style={styles.priceText}>btcusdt: {p}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  chartContainer: {
    width: '90%',
    height: 220,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  scrollView: {
    backgroundColor: theme.colors.white,
    padding: 10,
    width: '90%',
    marginBottom: 20,
  },
  text: {
    fontSize: theme.fonts.size.large,
    color: theme.colors.text,
    marginBottom: 10,
  },
  priceText: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.text,
  },
});

export default MarketDataScreen;
