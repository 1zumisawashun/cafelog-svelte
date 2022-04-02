<script lang="ts">
import ShopCard from '../home/ShopCard.svelte';
import ShopCardClose from '../home/ShopCardClose.svelte';
import ShopCardNew from '../home/ShopCardNew.svelte';
import { checkNewShop } from '../../../middleware/utilities';
export let shops: Array<any>;
</script>

<div class="user-tab-container">
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
