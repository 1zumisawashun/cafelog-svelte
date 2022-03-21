<script lang="ts">
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
</script>

<div class="common-header-container">
  <Router>
    <div class="logo">
      <img src="logo.jpg" alt="" />
    </div>
    <nav class="navbar">
      <Link to="">home</Link>
      <Link to="/about">about</Link>
      {#if user?.uid}
        <Link to="/post">post</Link>
      {/if}
      <Link to="/search">search</Link>
      {#if user?.uid}
        <Link to="{`/users/${user.uid}`}">users</Link>
      {/if}
    </nav>
  </Router>
</div>
