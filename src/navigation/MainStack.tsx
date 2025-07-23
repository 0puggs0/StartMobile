import { createStackNavigator } from '@react-navigation/stack';
import Authorization from '../screens/Auth';
import BottomTabs from './BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import LanguageScreen from '../screens/LanguageScreen';

export type RootStackParamList = {
  Splash: undefined;
  LanguageScreen: undefined;
  Authorization: undefined;
  BottomTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
        <Stack.Screen name="Authorization" component={Authorization} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
