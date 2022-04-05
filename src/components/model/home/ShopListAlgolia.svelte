<script lang="ts">
import ShopCard from './ShopCard.svelte';
import ShopCardClose from './ShopCardClose.svelte';
import ShopCardNew from './ShopCardNew.svelte';
import { checkNewShop } from '../../../middleware/utilities';
import { shopStore } from '../../../store/shopStore';
// NOTE:直接store情報を入れるため必要なコンポーネント
</script>

<div class="shop-list-container">
  {#each $shopStore as shop}
    {#if shop.openOrClose === '閉店'}
      <ShopCardClose shop="{shop}" />
    {:else if checkNewShop(shop?.createdAt?.toDate())}
      <ShopCardNew shop="{shop}" />
    {:else}
      <ShopCard shop="{shop}" />
    {/if}
  {/each}
</div>
