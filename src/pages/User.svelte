<script lang="ts">
import { onMount } from 'svelte';
import UserTab from '../components/model/user/UserTab.svelte';
import Loading from '../components/ui/Loading.svelte';
import { firebaseUseCase } from '../middleware/firebaseClient';
import type {
  SavedOrVisitedShop,
  FieldWithoutIdWithCreatedAt,
  FieldWithCreatedAt
} from '../@types/index';
import { convertedPath } from '../middleware/utilities';
import { initFirebaseAuth } from '../middleware/authClient';
let savedShops: Array<FieldWithCreatedAt> = [];
let visitedShops: Array<FieldWithCreatedAt> = [];

const removeReference = (
  map: Array<SavedOrVisitedShop>,
): Array<FieldWithCreatedAt> => {
  return map.map((el) => el.documents);
};

onMount(async () => {
  const user = await initFirebaseAuth();
  const savedShopsWithRef: Array<SavedOrVisitedShop> =
    await firebaseUseCase.fetchSubAll(
      convertedPath(`/users/${user.uid}/saved`),
    );
  savedShops = removeReference(savedShopsWithRef);

  const visitedShopsWithRef: Array<SavedOrVisitedShop> =
    await firebaseUseCase.fetchSubAll(
      convertedPath(`/users/${user.uid}/visited`),
    );
  visitedShops = removeReference(visitedShopsWithRef);

});
</script>

<div class="common-container _pt-5 _pb-5">
  <!-- {#if shops.length === 0}
    <Loading />
  {:else} -->
  <UserTab savedShops="{savedShops}" visitedShops="{visitedShops}" />
  <!-- {/if} -->
</div>
