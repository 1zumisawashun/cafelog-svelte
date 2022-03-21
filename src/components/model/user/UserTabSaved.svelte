<script lang="ts">
export let shops: Array<any>;
import ShopCard from '../shop/ShopCard.svelte';
</script>

<div class="user-tab-container">
  {#each shops as shop}
    <ShopCard shop="{shop}" />
  {/each}
</div>
