import React, { SVGProps } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PostsScreen } from '../screens/PostsScreen';
import { PostDetailsScreen } from '../screens/PostScreenDetails';
import PostsIcon from '../../assets/icons/home.svg';
import DetailsIcon from '../../assets/icons/mail.svg';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const iconSize = 30;

          let IconComponent: React.FC<SvgProps>;

          if (route.name === 'Posts') {
            IconComponent = PostsIcon;
          } else if (route.name === 'PostDetails') {
            IconComponent = DetailsIcon;
          }

          return (
            <View style={{ width: iconSize, height: iconSize }}>
              <IconComponent width={iconSize} height={iconSize} />
            </View>
          );
        },
        tabBarActiveTintColor: '#4a90e2',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Posts" component={PostsScreen} />
      <Tab.Screen name="PostDetails" component={PostDetailsScreen} />
    </Tab.Navigator>
  );
}
