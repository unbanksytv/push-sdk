import * as React from 'react';

import { ScrollView, SafeAreaView, StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { Notification, parseApiResponse } from '@epnsproject/sdk-uimobile';
import { fetchNotifications } from './api';
import { DEFAULT_NOTIFICATIONS } from './data';

/**
 * this comes from the gitignored file config.ts,
 * please add a config.ts file with the YOUTUBE_API_KEY
 */
import config from './config';

const dummyData = parseApiResponse(DEFAULT_NOTIFICATIONS);

export default function App() {
  const scrollViewRef = React.useRef<null | ScrollView>(null);

  const [user, setUser] = React.useState('0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1');
  const [notifData, setNotifData] = React.useState<any>([]);
  const [pageSize, setPageSize] = React.useState('10');

  const getData = async () => {
    const apiResponse = await fetchNotifications(user, parseInt(pageSize));
    console.clear();
    console.log('\n\ntotal notifs fetched: ', apiResponse.results.length, '\n\n');
    const parsedResults = parseApiResponse(apiResponse.results);

    setNotifData([
      ...parsedResults,
      ...dummyData
      // dummyData[0]
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
       <ScrollView
          ref={(ref) => {
            scrollViewRef.current = ref;
          }}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Text>SDK: Enter your ETH address: </Text>

          <TextInput
            style={styles.input}
            onChangeText={setUser}
            value={user}
          />

          <TextInput
            style={styles.input}
            onChangeText={setPageSize}
            value={pageSize}
          />

          <Button
            title="Fetch Notifs"
            onPress={() => getData()}
          />

        <View style={styles.list}>
          {notifData.map((oneNotification: any, idx: number) => {
            const {cta, title, message, app, icon, image, blockchain, appbot } = oneNotification;
              return (
                <Notification
                  key={idx}
                  notificationTitle={title}
                  notificationBody={message}
                  cta={cta}
                  app={app}
                  icon={icon}
                  image={image}
                  chainName={blockchain}
                  appbot={appbot}
                  youTubeAPIKey={config.YOUTUBE_API_KEY}
                />
              );
            })}
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 320,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  list: {
    display: 'flex',
    width: 380,
  },
  appicon: {
    width: 20,
    height: 20,
  },
});
