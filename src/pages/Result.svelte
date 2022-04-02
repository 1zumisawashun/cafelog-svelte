<script lang="ts">
import { onMount } from 'svelte';
import ShopList from '../components/model/home/ShopList.svelte';
import Loading from '../components/ui/Loading.svelte';
import { firebaseUseCase } from '../middleware/firebaseClient';
import queryString from 'query-string';
import { dammyShopData } from '../middleware/constants';
import { initFirebaseAuth } from '../middleware/authClient';
import type { FieldWithCreatedAt } from '../@types/index';
const parsed = queryString.parse(location.search);
let shops: Array<FieldWithCreatedAt> = [];

onMount(async () => {
  const user = await initFirebaseAuth();
  shops = await firebaseUseCase.fetchQueryAll(user?.uid, [
    'tags',
    'array-contains',
    parsed.tag,
  ]);
  console.log(shops, 'firebaseUseCase on SearchResult.svelte');
  if (shops.length < 6) {
    const result = [...Array(6 - shops.length)].map(() => dammyShopData);
    shops = [...shops, ...result];
  }
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if shops.length === 0}
    <Loading />
  {:else}
    <ShopList shops="{shops}" />
  {/if}
</div>
