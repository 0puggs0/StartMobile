import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import activePostStore from '../../store/activePostStore';
import { observer } from 'mobx-react-lite';
import { styles } from './styles';

export const PostDetailsScreen = observer(() => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 {t('postDetails')}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>{t('heading')}:</Text>
        <Text style={styles.title}>{activePostStore.post.title}</Text>
        <Text style={styles.label}>{t('content')}:</Text>
        <Text style={styles.body}>{activePostStore.post.body}</Text>
      </View>
    </View>
  );
});
