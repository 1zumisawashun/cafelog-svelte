<script lang="ts">
import { Router, Link, Route } from 'svelte-routing';
</script>

<div class="common-header-container">
  <Router>
    <div class="logo">
      <img src="logo.jpg" alt="" />
    </div>
    <nav class="navbar">
      <Link to="">home</Link>
      <Link to="/about">about</Link>
      <Link to="/post">post</Link>
      <Link to="/search">search</Link>
      <Link to="/users/123">users</Link>
    </nav>
  </Router>
</div>
