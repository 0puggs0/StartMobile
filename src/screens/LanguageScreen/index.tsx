import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import i18n from '../../i18n/index.ts';
import { Storage } from '../../storage/storage';
import { languages } from '../../constants/languages';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/MainStack';

const LanguageScreen = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'LanguageScreen'>>();

  const currentLanguage = i18n.language;
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const confirmLanguage = async () => {
    await i18n.changeLanguage(selectedLanguage);
    Storage.set('appLanguage', selectedLanguage);
    navigation.navigate('Authorization');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌐 Выбор языка</Text>

      {languages.map(lang => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.button,
            selectedLanguage === lang.code && styles.activeButton,
          ]}
          onPress={() => setSelectedLanguage(lang.code)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedLanguage === lang.code && styles.activeText,
            ]}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.confirmButton]}
        onPress={confirmLanguage}
      >
        <Text style={styles.confirmText}>✅ Подтвердить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
  },
  activeButton: {
    backgroundColor: '#4a90e2',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  activeText: {
    color: 'white',
    fontWeight: '600',
  },
  confirmButton: {
    marginTop: 24,
    padding: 14,
    backgroundColor: '#28a745',
    borderRadius: 8,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
