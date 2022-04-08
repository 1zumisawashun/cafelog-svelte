<script lang="ts">
import { onMount } from 'svelte';
import Loading from '../components/ui/Loading.svelte';
import type { FieldWithCreatedAt } from '../@types/index';
let shops: Array<FieldWithCreatedAt> = [];
import SearchHeader from '../components/model/home/SearchHeader.svelte';
import { shopStore } from '../store/shopStore';
import ShopListAlgolia from '../components/model/home/ShopListAlgolia.svelte';
import { querySearch } from '../middleware/algoliaClient';
import { timestamp } from '../firebase/config';

onMount(async () => {
  const result = await querySearch('');
  console.log(result, 'result');
  const formatAlgoliaHits = result.hits.map((el) => {
    const { objectID, path, lastmodified, createdAt, ...rest } = el;
    return {
      id: objectID,
      createdAt: timestamp.fromDate(new Date(createdAt)),
      ...rest,
    };
  });

  // NOTE:配列からnullableを排除する
  shops = formatAlgoliaHits.filter(
    (item): item is NonNullable<typeof item> => item !== null,
  );

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
