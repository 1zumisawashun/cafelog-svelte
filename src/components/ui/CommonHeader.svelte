<script lang="ts">
import { login, logout, annoymouse } from '../../middleware/auth';
import { Router, Link, Route } from 'svelte-routing';
import { onMount } from 'svelte';
import { authStore } from '../../store/authStore';
import { projectAuth } from '../../firebase/config';
import type { firebase } from '../../firebase/config';
import ModalConfirm from '../ui/ModalConfirm.svelte';

let user: firebase.User;
let setToggleModal: boolean = false;

onMount(() => {
  // NOTE:リロード・初回アクセス時にstoreにユーザー情報を格納する
  // FIXME:ミドルウェアにまとめても良いかも
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
};
const handleLogout = () => {
  logout();
  authStore.set(null);
  user = null;
};
const handleAnnoymouse = () => {
  // NOTE:Firebase consoleで登録する必要がある
  annoymouse();
};

const openModal = () => {
  setToggleModal = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  setToggleModal = false;
  document.body.style.overflow = '';
};
</script>

<header class="common-header-container">
  <Router>
    <div class="logo">
      <!-- NOTE: public ディレクトリから呼ばないと表示できないっぽい -->
      <img src="assets/image/logo.jpg" alt="" />
    </div>
    <nav class="navbar">
      <Link to="" class="item">home</Link>
      <Link to="/search" class="item">search</Link>
      {#if user?.uid}
        <Link to="/post" class="item">post</Link>
        <Link to="{`/users/${user.uid}`}" class="item">users</Link>
        <button on:click="{openModal}" class="item">logout</button>
      {:else}
        <button on:click="{handleLogin}" class="item">login</button>
        <button on:click="{handleAnnoymouse}" class="item">annoymouse</button>
      {/if}
    </nav>
  </Router>
</header>

{#if setToggleModal}
  <div class="common-container">
    <ModalConfirm
      on:click-handler="{handleLogout}"
      on:close-modal="{closeModal}">
      <p class="message">本当にログアウトしますか？</p>
    </ModalConfirm>
  </div>
{/if}
