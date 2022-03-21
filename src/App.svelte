<script lang="ts">
import { Router, Link, Route } from 'svelte-routing';
import Header from './components/ui/CommonHeader.svelte';
// import Footer from './components/ui/CommonFooter.svelte';
import Home from './pages/Home.svelte';
import Post from './pages/Post.svelte';
import Search from './pages/Search.svelte';
import User from './pages/User.svelte';
import Shop from './pages/Shop.svelte';
</script>

<main>
  <Header />
  <Router>
    <main>
      <Route path="">
        <Home />
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
      <Route path="/shops/:id" let:params>
        <Shop id="{params.id}" />
      </Route>
    </main>
  </Router>
  <!-- <Footer /> -->
</main>
