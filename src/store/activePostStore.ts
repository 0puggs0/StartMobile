import { makeAutoObservable } from 'mobx';
type Post = { id: string; title: string; body: string };

class ActivePostStore {
  post: Partial<Post> = {};
  constructor() {
    makeAutoObservable(this);
  }
  setActivePost(value: Post) {
    this.post = value;
  }
}
export default new ActivePostStore();
