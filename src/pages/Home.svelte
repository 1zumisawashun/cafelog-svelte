<script lang="ts">
import { onMount } from 'svelte';
import ShopList from '../components/model/shop/ShopList.svelte';
import Loading from '../components/ui/Loading.svelte';
import { shopUseCase } from '../middleware/firebaseClient';
let shops: Array<any> = [];

onMount(async () => {
  shops = await shopUseCase.fetchAll();
  console.log(shops, 'shopUseCase on Home.svelte');
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if shops.length === 0}
    <Loading />
  {:else}
    <ShopList shops="{shops}" />
  {/if}
</div>
