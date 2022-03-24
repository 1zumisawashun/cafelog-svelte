<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { style } from '../../middleware/style';
import { scrollTop } from '../../middleware/utilities';

let styles = { top: `${scrollTop()}px` };

onMount(() => {
  document.body.style.overflow = 'hidden';
  console.log('loading start');
});

onDestroy(() => {
  document.body.style.overflow = '';
  console.log('loading end');
});
</script>

<div class="overlay" use:style="{styles}">
  <div class="wrapper">
    <div class="loading-container"></div>
  </div>
</div>
