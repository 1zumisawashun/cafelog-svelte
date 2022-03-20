<script lang="ts">
import { login, logout, annoymouse } from '../middleware/auth';
const handleLogin = () => {
  console.log('login');
  login();
};
const handleLogout = () => {
  console.log('logout');
  logout();
};
const handleAnnoymouse = () => {
  console.log('annoymouse');
  annoymouse();
};
</script>

<div class="common-container">
  <p>About</p>
  <button class="btn" on:click="{handleLogin}">login</button>
  <button class="btn" on:click="{handleLogout}">logout</button>
  <button class="btn" on:click="{handleAnnoymouse}">guestlogin</button>
</div>

<style lang="scss"></style>
