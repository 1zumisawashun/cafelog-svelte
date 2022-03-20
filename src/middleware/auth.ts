import { UserStore } from '../store/UserStore';
import { projectAuth } from '../firebase/config';

// NOTE:unsubにしないとメモリリークするかも
// NOTE:リロード時にstoreにuser情報を入れる
export const listenForAuthChanges = () => {
  return projectAuth.onAuthStateChanged((user) => {
    if (user) {
      UserStore.set(user);
    } else {
      UserStore.set(null);
    }
  });
};
