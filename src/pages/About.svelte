<script lang="ts">
import {
  projectAuth,
  projectFirestore,
  firebase,
  provider,
} from '../firebase/config';
import { UserStore } from '../store/UserStore';
const logout = async () => {
  try {
    const result = projectAuth.signOut();
    UserStore.update((currentUser) => {
      return null;
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const login = async () => {
  const result = await projectAuth.signInWithPopup(provider);
  const { uid, displayName, photoURL, email } = result.user;
  projectFirestore.collection('users').doc(uid).set({
    uid,
    displayName,
    photoURL,
    email,
  });
  const user = result.user;
  UserStore.update((currentUser: firebase.User) => {
    return { user, ...currentUser };
  });
};

const anonymouse = async () => {
  try {
    const result = await projectAuth.signInAnonymously();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
</script>

<div class="common-container">
  <p>About</p>
  <button class="btn" on:click="{login}">login</button>
  <button class="btn" on:click="{logout}">logout</button>
  <button class="btn" on:click="{anonymouse}">guestlogin</button>
</div>

<style lang="scss"></style>
