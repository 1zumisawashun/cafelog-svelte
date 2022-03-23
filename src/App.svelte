<script lang="ts">
import { Router, Link, Route } from 'svelte-routing';
import Header from './components/ui/CommonHeader.svelte';
import Footer from './components/ui/CommonFooter.svelte';
import Home from './pages/Home.svelte';
import Post from './pages/Post.svelte';
import Search from './pages/Search.svelte';
import User from './pages/User.svelte';
import Shop from './pages/Shop.svelte';
export let ready;
// import Map from './components/model/shop/ShopMap.svelte';
</script>

<svelte:head>
  <script
    defer
    async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGFOpJI_JxmQXKr87-mis_Eigr5ApJfw4&callback=initMap">
  </script>
</svelte:head>

<!-- {#if ready}
  <Map />
{/if} -->
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
        <User />
      </Route>
      <Route path="/shops/:id" let:params>
        <Shop id="{params.id}" ready="{ready}" />
      </Route>
    </main>
  </Router>
  <Footer />
</main>
