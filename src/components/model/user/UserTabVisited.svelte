<script lang="ts">
import ShopCard from '../shop/ShopCard.svelte';
import ShopCardClose from '../shop/ShopCardClose.svelte';
import ShopCardNew from '../shop/ShopCardNew.svelte';
export let shops: Array<any>;
</script>

<div class="user-tab-container">
  {#each shops as shop}
    {#if shop.openOrClose === '開店' || shop.openOrClose === ''}
      <ShopCard shop="{shop}" />
    {:else if shop.openOrClose === '閉店'}
      <ShopCardClose shop="{shop}" />
    {:else}
      <ShopCardNew shop="{shop}" />
    {/if}
  {/each}
</div>
