<script lang="ts">
import ShopCard from './ShopCard.svelte';
import ShopCardClose from './ShopCardClose.svelte';
import ShopCardNew from './ShopCardNew.svelte';
import { checkNewShop } from '../../../middleware/utilities';
export let shops: Array<FieldWithCreatedAt>;
import type { FieldWithCreatedAt } from '../../../@types/index';
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
