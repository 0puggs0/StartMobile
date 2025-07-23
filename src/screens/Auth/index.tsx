import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/MainStack';
import { styles } from './styles';
import { Storage } from '../../storage/storage';
import { useTranslation } from 'react-i18next';

type FormData = {
  email: string;
  password: string;
};

const correctData = {
  email: 'test@mail.ru',
  password: 'pass12345',
};

export default function Authorization() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'Authorization'>>();

  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' });

  const onSubmit = (data: FormData) => {
    if (
      data.email === correctData.email &&
      data.password === correctData.password
    ) {
      Storage.set('isAuth', 'true');
      navigation.navigate('BottomTabs');
    } else {
      Alert.alert(t('error'), t('error_login_or_password'));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>{t('authorization')}</Text>
      <Text style={styles.label}>{t('email')}</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: t('email_required'),
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: t('wrong_email'),
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="example@mail.com"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Text style={styles.label}>{t('password')}</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: t('password_required'),
          minLength: {
            value: 6,
            message: t('wrong_password'),
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder={t('enter_password')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>{t('do_authorization')}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
