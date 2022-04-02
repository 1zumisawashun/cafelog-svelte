<script lang="ts">
import { onMount } from 'svelte';
import UserTab from '../components/model/user/UserTab.svelte';
import Loading from '../components/ui/Loading.svelte';
import { firebaseUseCase } from '../middleware/firebaseClient';
import type {
  SavedOrVisitedShop,
  FieldWithoutIdWithCreatedAt,
  FieldWithCreatedAt,
} from '../@types/index';
import { convertedPath } from '../middleware/utilities';
import { initFirebaseAuth } from '../middleware/authClient';
import { dammyShopData } from '../middleware/constants';
let savedShops: Array<FieldWithCreatedAt> = [];
let visitedShops: Array<FieldWithCreatedAt> = [];

const removeReference = (
  map: Array<SavedOrVisitedShop>,
  isSaved: boolean,
  isVisited: boolean,
): Array<FieldWithCreatedAt> => {
  return map.map((el) => {
    return {
      ...el.documents,
      isSaved,
      isVisited,
    };
  });
};

onMount(async () => {
  const user = await initFirebaseAuth();
  if (!user) return;

  const savedShopsWithRef: Array<SavedOrVisitedShop> =
    await firebaseUseCase.fetchSubAll(
      convertedPath(`/users/${user.uid}/saved`),
    );
  savedShops = removeReference(savedShopsWithRef, true, false);

  const visitedShopsWithRef: Array<SavedOrVisitedShop> =
    await firebaseUseCase.fetchSubAll(
      convertedPath(`/users/${user.uid}/visited`),
    );
  visitedShops = removeReference(visitedShopsWithRef, false, true);
  if (savedShops.length < 6) {
    const result = [...Array(6 - savedShops.length)].map(() => dammyShopData);
    savedShops = [...savedShops, ...result];
  }
  if (visitedShops.length < 6) {
    const result = [...Array(6 - visitedShops.length)].map(() => dammyShopData);
    visitedShops = [...visitedShops, ...result];
  }
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if savedShops.length === 0 && visitedShops.length === 0}
    <Loading />
  {:else}
    <UserTab savedShops="{savedShops}" visitedShops="{visitedShops}" />
  {/if}
</div>
