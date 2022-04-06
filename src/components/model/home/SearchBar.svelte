<script lang="ts">
import { querySearch } from '../../../middleware/algoliaClient';
import { shopStore } from '../../../store/shopStore';
import { timestamp } from '../../../firebase/config';
let query: string = '';

const handleInput = async (e: Event) => {
  let target = e.target as HTMLInputElement;
  const result = await querySearch(target.value);
  const formatAlgoliaHits = result.hits.map((el) => {
    const { objectID, path, lastmodified, createdAt, ...rest } = el;
    return {
      id: objectID,
      createdAt: timestamp.fromDate(new Date(createdAt)),
      ...rest,
    };
  });

  // NOTE:配列からnullableを排除する
  const removeNullable = formatAlgoliaHits.filter(
    (item): item is NonNullable<typeof item> => item !== null,
  );

  shopStore.update((currentShops) => {
    return (currentShops = removeNullable);
  });
};
</script>

<div class="form-field">
  <label class="label" for="query">Stop looking for a shop — find it.</label>
  <input
    class="input"
    type="text"
    id="query"
    placeholder="shop, station, location and so on..."
    bind:value="{query}"
    on:input="{handleInput}" />
</div>
