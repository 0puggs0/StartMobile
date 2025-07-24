import { View } from 'react-native';
import React, { useEffect } from 'react';
import { Storage } from '../../storage/storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/MainStack';
import i18n from '../../i18n/index.ts';

export default function Splash() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'Splash'>>();
  useEffect(() => {
    (async () => {
      const isAuth = Storage.get('isAuth');
      const currentLang = Storage.get('appLanguage');
      if (!isAuth) {
        navigation.navigate('LanguageScreen');
      } else {
        await i18n.changeLanguage(currentLang);
        navigation.navigate('BottomTabs');
      }
    })();
  }, []);
  return <View></View>;
}
