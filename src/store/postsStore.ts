import { makeAutoObservable, runInAction } from 'mobx';
import { get } from '../api/api';

const LIMIT = 10;

type Post = { id: string; title: string; body: string };

class PostStore {
  posts: Post[] = [];
  page = 0;
  isLoadingMore = false;
  isRefreshing = false;
  hasMore = true;
  searchQuery = '';

  constructor() {
    makeAutoObservable(this, {
      filteredPosts: true,
    });
  }

  get filteredPosts(): Post[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.posts;

    return this.posts.filter(
      post =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query),
    );
  }

  setSearchQuery(value: string) {
    this.searchQuery = value;
  }

  setPosts(value: Post[]) {
    this.posts = value;
  }
  setHasMore(value: boolean) {
    this.hasMore = value;
  }
  setIsLoadingMore(value: boolean) {
    this.isLoadingMore = value;
  }
  setIsRefreshing(value: boolean) {
    this.isRefreshing = value;
  }
  setPage(value: number) {
    this.page = value;
  }

  async loadMorePosts() {
    if (this.isLoadingMore || !this.hasMore) return;
    this.setIsLoadingMore(true);
    try {
      const res = await get(
        `/posts?_start=${this.page * LIMIT}&_limit=${LIMIT}`,
      );

      runInAction(() => {
        this.setPosts([...this.posts, ...res]);
        if (res.length < LIMIT) {
          this.setHasMore(false);
        }
        this.setPage(this.page + 1);
      });
    } catch (err) {
      console.error('Ошибка загрузки постов:', err);
    } finally {
      runInAction(() => {
        this.setIsLoadingMore(false);
      });
    }
  }

  async refreshPosts() {
    if (this.isRefreshing) return;

    this.setIsRefreshing(true);
    this.setHasMore(true);

    try {
      const res = await get(`/posts?_start=0&_limit=${LIMIT}`);
      runInAction(() => {
        this.setPosts(res);
        this.setPage(1);
      });
    } catch (err) {
      console.error('Ошибка обновления постов:', err);
    } finally {
      this.setIsRefreshing(false);
    }
  }
}

export default new PostStore();
