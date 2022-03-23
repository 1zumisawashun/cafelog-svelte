<script lang="ts">
export let ready;
import Map from './ShopMap.svelte';
// 詳細ページでリロードすると真っ白になる
</script>

<div class="common-container">
  <p>shop-detail</p>
  {#if ready}
    <Map />
  {/if}
</div>

<style lang="scss"></style>
