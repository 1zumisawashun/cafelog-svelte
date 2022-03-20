<script lang="ts">
export let shops: Array<any>;
import ShopCard from '../shop/ShopCard.svelte';
</script>

<div class="shop-list-container">
  {#each shops as shop}
    <ShopCard shop="{shop}" />
  {/each}
</div>

<style>
.shop-list-container {
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 30px 4%;
}
</style>
