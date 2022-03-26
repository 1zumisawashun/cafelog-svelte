<script lang="ts">
import ShopCard from '../shop/ShopCard.svelte';
export let shops;
</script>

<div class="user-tab-container">
  {#each shops as shop}
    <ShopCard shop="{shop}" />
  {/each}
</div>
