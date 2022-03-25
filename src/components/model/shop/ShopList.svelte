<script lang="ts">
export let shops: Array<any>;
import ShopCard from '../shop/ShopCard.svelte';
import ShopCardClose from '../shop/ShopCardClose.svelte';
import ShopCardNew from '../shop/ShopCardNew.svelte';
</script>

<div class="shop-list-container">
  {#each shops as shop}
    {#if shop.openOrClose === '開店'}
      <ShopCard shop="{shop}" />
    {:else if shop.openOrClose === '閉店'}
      <ShopCardClose shop="{shop}" />
    {:else}
      <ShopCardNew shop="{shop}" />
    {/if}
  {/each}
</div>
