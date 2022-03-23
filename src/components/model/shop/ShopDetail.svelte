<script lang="ts">
export let ready;
export let shop;
import Map from './ShopMap.svelte';
</script>

<div class="shop-detail-container">
  <img src="{shop.photoUrls}" alt="" />
  <p>{shop.shopName}</p>
  {#if ready}
    <Map />
  {/if}
</div>

<style lang="scss">
.shop-detail-container {
  width: 50%;
  margin: 0 auto;
}
img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
