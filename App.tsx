import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import GetProduct from './src/screen/GetProduct';
import PostProducts from './src/screen/PostProducts';

export default function App() {

const Stack = createStackNavigator();

  return (
    <NavigationContainer> 
    <Stack.Navigator initialRouteName='PostProducts'>
      <Stack.Screen name="GetProduct" component={GetProduct} />
      <Stack.Screen name="PostProducts" component={PostProducts} />
    </Stack.Navigator>
    </NavigationContainer>  
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
