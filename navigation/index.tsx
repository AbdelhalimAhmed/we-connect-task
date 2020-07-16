import * as React from 'react';
import { ColorSchemeName, ActivityIndicator, Text, Button } from 'react-native';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useQuery, gql } from '@apollo/client';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import TabOneScreen from '../screens/TabOneScreen';
import DetailsScreen from '../screens/DetailsScreen';

const GET_MENU = gql`
query {
  menu {
    name
    title
    url
  }
}`

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function RootNavigator() {
  const { loading, error, data } = useQuery(GET_MENU);
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error :(</Text>;
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Root" component={StackScreen} />
      {data.menu.map(e => <Drawer.Screen key={`${e.name}`} name={`${e.name}`} component={DetailsStack} initialParams={e} />)}
    </Drawer.Navigator>
  );
}

function StackScreen(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={TabOneScreen}
        options={{
          headerLeft: () => <DrawerButton navigation={props.navigation} />
        }}
      />
    </Stack.Navigator>
  );
}


function DetailsStack(props) {
  console.log({ props })
  const { params } = props.route
  return (
    <Stack.Navigator>
      <Stack.Screen
        initialParams={params}
        name={params.title}
        component={DetailsScreen}
        options={{
          headerLeft: () => <DrawerButton navigation={props.navigation} />
        }}
      />
    </Stack.Navigator>
  );
}

const DrawerButton = ({ navigation }) => {
  return (
    <Button
      onPress={() => navigation.openDrawer()}
      title="Menu"
      color="#000"
    />
  )
} 