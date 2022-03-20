<script lang="ts">
import { Router, Link, Route } from 'svelte-routing';
import Header from './components/ui/CommonHeader.svelte';
// import Footer from './components/ui/CommonFooter.svelte';
import Home from './pages/Home.svelte';
import About from './pages/About.svelte';
import Post from './pages/Post.svelte';
import Search from './pages/Search.svelte';
import User from './pages/User.svelte';
import { onMount } from 'svelte';
import { listenForAuthChanges } from './middleware/auth';
onMount(() => {
  return listenForAuthChanges();
});
</script>

<main>
  <Header />
  <Router>
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
  <!-- <Footer /> -->
</main>
