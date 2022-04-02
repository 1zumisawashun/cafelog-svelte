import { projectAuth, projectFirestore, provider } from '../firebase/config';
import type { firebase } from '../firebase/config';

export const initFirebaseAuth = (): Promise<firebase.User> => {
  return new Promise((resolve) => {
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      // NOTE: user オブジェクトを resolve する
      if (user) {
        resolve(user);
      }
      // NOTE:登録解除
      unsubscribe();
    });
  });
};

export const logout = async () => {
  try {
    const result = projectAuth.signOut();
    console.log(result);
    window.location.href = '/';
  } catch (error) {
    console.log(error);
  }
};

export const login = async () => {
  try {
    const result = await projectAuth.signInWithPopup(provider);
    if (!result.user) return;
    const { uid, displayName, photoURL, email } = result.user;
    projectFirestore.collection('users').doc(uid).set({
      uid,
      displayName,
      photoURL,
      email,
    });
    window.location.href = '/';
  } catch (error) {
    console.log(error);
  }
};

export const annoymouse = async () => {
  try {
    const result = await projectAuth.signInAnonymously();
    console.log(result);
    window.location.href = '/';
  } catch (error) {
    console.log(error);
  }
};
