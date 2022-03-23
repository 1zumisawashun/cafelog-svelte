<script lang="ts">
export let ready;
export let shop;
import ShopComment from './ShopComment.svelte';
import ShopInformationTable from './ShopInformationTable.svelte';
import Map from './ShopMap.svelte';
import ShopPhoto from './ShopPhoto.svelte';
import ShopTabHeader from './ShopTabHeader.svelte';

//tabs
let items = ['Shop Information', 'Shop Comment', 'Shop Photo'];
let activeItem = 'Shop Information';

const tabChange = (e) => {
  activeItem = e.detail;
};
</script>

<div class="shop-detail-container">
  <img src="{shop.photoUrls}" alt="" class="image" />
  <h1 class="title">{shop.shopName}</h1>
  <div class="_mt-3">
    <ShopTabHeader
      items="{items}"
      activeItem="{activeItem}"
      on:tabChange="{tabChange}" />
    {#if activeItem === 'Shop Information'}
      <ShopInformationTable />
      {#if ready}
        <Map />
      {/if}
    {:else if activeItem === 'Shop Comment'}
      <ShopComment />
    {:else if activeItem === 'Shop Photo'}
      <ShopPhoto />
    {/if}
  </div>
</div>
