import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window')
import { RootStackParamList } from '../types';

export default function DetailsScreen({
  navigation,
  ...others
}: StackScreenProps<RootStackParamList, 'DetailsScreen'>) {
  const { url } = others.route.params
  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} style={styles.web}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator style={styles.loading} color={'black'} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
  },
  web: {
    // marginTop: 50,
    width,
    height
  },
  loading: {
    position: 'absolute',
    top: '50%',
    right: '50%',
  },
});
