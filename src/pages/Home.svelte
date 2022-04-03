<script lang="ts">
import { onMount } from 'svelte';
import ShopList from '../components/model/home/ShopList.svelte';
import Loading from '../components/ui/Loading.svelte';
import { firebaseUseCase } from '../middleware/firebaseClient';
import type { FieldWithCreatedAt } from '../@types/index';
import { initFirebaseAuth } from '../middleware/authClient';
let shops: Array<FieldWithCreatedAt> = [];
import SearchHeader from '../components/model/home/SearchHeader.svelte';

onMount(async () => {
  const user = await initFirebaseAuth();
  shops = await firebaseUseCase.fetchAll(user?.uid);
  // Algoliaから持ってくる
});
</script>

<SearchHeader />
<div class="common-container _pt-5 _pb-5">
  {#if shops.length === 0}
    <Loading />
  {:else}
    <ShopList shops="{shops}" />
  {/if}
</div>
