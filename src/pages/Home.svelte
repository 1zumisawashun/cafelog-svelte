<script lang="ts">
import { onMount } from 'svelte';
import Loading from '../components/ui/Loading.svelte';
import { firebaseUseCase } from '../middleware/firebaseClient';
import type { FieldWithCreatedAt } from '../@types/index';
import { initFirebaseAuth } from '../middleware/authClient';
let shops: Array<FieldWithCreatedAt> = [];
import SearchHeader from '../components/model/home/SearchHeader.svelte';
import { shopStore } from '../store/shopStore';
import ShopListAlgolia from '../components/model/home/ShopListAlgolia.svelte';

onMount(async () => {
  const user = await initFirebaseAuth();
  shops = await firebaseUseCase.fetchAll(user?.uid);
  shopStore.update((currentShops) => {
    return (currentShops = shops);
  });
});
</script>

<SearchHeader />
<div class="common-container _pt-5 _pb-5">
  {#if shops.length === 0}
    <Loading />
  {:else}
    <ShopListAlgolia />
  {/if}
</div>
