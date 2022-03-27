<script lang="ts">
import ShopCard from '../shop/ShopCard.svelte';
import ShopCardClose from '../shop/ShopCardClose.svelte';
import ShopCardNew from '../shop/ShopCardNew.svelte';
import { checkNewShop } from '../../../middleware/utilities';
export let shops: Array<any>;
</script>

<div class="shop-list-container">
  {#each shops as shop}
    {#if shop.openOrClose === '閉店'}
      <ShopCardClose shop="{shop}" />
    {:else if checkNewShop(shop?.createdAt?.toDate())}
      <ShopCardNew shop="{shop}" />
    {:else}
      <ShopCard shop="{shop}" />
    {/if}
  {/each}
</div>
