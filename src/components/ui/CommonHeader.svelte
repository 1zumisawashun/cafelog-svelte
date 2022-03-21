<script lang="ts">
import { login, logout, annoymouse } from '../../middleware/auth';
import { Router, Link, Route } from 'svelte-routing';
import { onMount } from 'svelte';
import { authStore } from '../../store/authStore';
import { projectAuth } from '../../firebase/config';
import type { firebase } from '../../firebase/config';
let user: firebase.User;

onMount(() => {
  // NOTE:リロード・初回アクセス時にstoreにユーザー情報を格納する
  projectAuth.onAuthStateChanged((auth) => {
    if (auth) {
      authStore.set(auth);
      user = auth;
      console.log(user, 'restore user information on store');
    } else {
      authStore.set(null);
    }
  });
});

const handleLogin = () => {
  login();
  console.log('login');
};
const handleLogout = () => {
  logout();
  console.log('logout');
  authStore.set(null);
  user = null;
};
const handleAnnoymouse = () => {
  annoymouse();
  console.log('annoymouse');
};
</script>

<div class="common-header-container">
  <Router>
    <div class="logo">
      <img src="logo.jpg" alt="" />
    </div>
    <nav class="navbar">
      <Link to="" class="item">home</Link>
      <Link to="/about" class="item">about</Link>
      <Link to="/search" class="item">search</Link>
      {#if user?.uid}
        <Link to="/post" class="item">post</Link>
        <Link to="{`/users/${user.uid}`}" class="item">users</Link>
        <button on:click="{handleLogout}" class="item">logout</button>
      {:else}
        <button on:click="{handleLogin}" class="item">login</button>
        <button on:click="{handleAnnoymouse}" class="item">annoymouse</button>
      {/if}
    </nav>
  </Router>
</div>
