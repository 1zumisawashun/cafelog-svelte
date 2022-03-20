import { onMount } from 'svelte';
import { authStore } from '../store/authStore';
import {
  projectAuth,
  projectFirestore,
  firebase,
  provider,
} from '../firebase/config';

export const logout = async () => {
  try {
    const result = projectAuth.signOut();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const login = async () => {
  const result = await projectAuth.signInWithPopup(provider);
  const { uid, displayName, photoURL, email } = result.user;
  projectFirestore.collection('users').doc(uid).set({
    uid,
    displayName,
    photoURL,
    email,
  });
};

export const annoymouse = async () => {
  try {
    const result = await projectAuth.signInAnonymously();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
