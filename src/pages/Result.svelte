<script lang="ts">
import { onMount } from 'svelte';
import ShopList from '../components/model/shop/ShopList.svelte';
import Loading from '../components/ui/Loading.svelte';
import { firebaseUseCase } from '../middleware/firebaseClient';
import queryString from 'query-string';
const parsed = queryString.parse(location.search);
let shops: Array<any> = [];

onMount(async () => {
  shops = await firebaseUseCase.fetchQueryAll([
    'tags',
    'array-contains',
    parsed.tag,
  ]);
  console.log(shops, 'firebaseUseCase on SearchResult.svelte');
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if shops.length === 0}
    <Loading />
  {:else}
    <ShopList shops="{shops}" />
  {/if}
</div>
