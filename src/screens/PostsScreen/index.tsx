import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Post } from '../../components/post';
import postsStore from '../../store/postsStore';
import { observer } from 'mobx-react-lite';
import activePostStore from '../../store/activePostStore';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import HomeIcon from '../../../assets/icons/home.svg';

export const PostsScreen = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    postsStore.refreshPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 {t('postsList')}</Text>
      <TextInput
        placeholder={t('search_placeholder')}
        value={postsStore.searchQuery}
        onChangeText={value => postsStore.setSearchQuery(value)}
        style={styles.searchInput}
      />
      <FlatList
        data={postsStore.filteredPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Post
            title={item.title}
            body={item.body}
            onPress={() =>
              activePostStore.setActivePost({
                title: item.title,
                id: item.id,
                body: item.body,
              })
            }
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={postsStore.isRefreshing}
        onRefresh={() => postsStore.refreshPosts()}
        onEndReached={() => {
          postsStore.posts.length && postsStore.loadMorePosts();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          postsStore.isLoadingMore ? (
            <ActivityIndicator size="small" color="#4a90e2" />
          ) : null
        }
      />
    </View>
  );
});
