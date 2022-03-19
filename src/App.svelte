<script lang="ts">
import { Router, Link, Route } from 'svelte-routing';
import Home from './pages/Home.svelte';
import About from './pages/About.svelte';
import Post from './pages/Post.svelte';
import Search from './pages/Search.svelte';
import User from './pages/User.svelte';
import { timestamp } from './firebase/config';
export let name: string;
console.log(timestamp, 'timestamp');
</script>

<main>
  <h1 class="-blue _mt-10">Hello {name}!</h1>
  <h2 class="-blue">Hello</h2>
  <Router>
    <nav>
      <Link to="">home</Link>
      <Link to="/about">about</Link>
      <Link to="/post">post</Link>
      <Link to="/search">search</Link>
      <Link to="/users/123">users</Link>
    </nav>
    <main>
      <Route path="">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/post">
        <Post />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/users/:id" let:params>
        <User id="{params.id}" />
      </Route>
    </main>
  </Router>
</main>

<style lang="scss">
main {
  text-align: center;
  padding: 1em;
  max-width: 240px;
  margin: 0 auto;
}

h1 {
  color: #ff3e00;
  text-transform: uppercase;
  font-size: 4em;
  font-weight: 100;
  &.-blue {
    color: #45c496;
  }
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}
</style>
