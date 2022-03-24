<script lang="ts">
import { onMount } from 'svelte';
import UserTab from '../components/model/user/UserTab.svelte';
import Loading from '../components/ui/Loading.svelte';
import { db } from '../middleware/firebaseClient';
let shops: Array<any> = [];

const getFirestore = async () => {
  const ref = db.shops;
  const snapshot = await ref.get();
  const result = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  shops = [...shops, ...result];
};

onMount(async () => {
  getFirestore();
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if shops.length === 0}
    <Loading />
  {:else}
    <UserTab shops="{shops}" />
  {/if}
</div>
