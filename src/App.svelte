<script lang="ts">
import { timestamp } from './firebase/config';
export let name: string;
console.log(timestamp, 'timestamp');
</script>

<main>
  <h1 class="-blue">Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>
<span
  ><div>foo</div>
  <span>bar</span></span>

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
