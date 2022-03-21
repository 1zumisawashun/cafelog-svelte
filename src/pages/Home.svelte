<script lang="ts">
import { onMount } from 'svelte';
import { projectFirestore } from '../firebase/config';
import ShopList from '../components/model/shop/ShopList.svelte';
import { shopStore } from '../store/shopStore';
import Loading from '../components/ui/Loading.svelte';
let shops: Array<any> = [];

const unsub = shopStore.subscribe((data) => {
  shops = [...shops, ...data];
});

const getFirestore = async () => {
  const ref = await projectFirestore.collection('shops');
  const snapshot = await ref.get();
  const result = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  shops = [...shops, ...result];
};

onMount(async () => {
  unsub();
  getFirestore();
  console.log(shops, 'shop');
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if shops.length === 0}
    <Loading />
  {:else}
    <ShopList shops="{shops}" />
  {/if}
</div>
