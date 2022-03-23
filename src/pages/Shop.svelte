<script lang="ts">
export let id;
export let ready;
import ShopDetail from '../components/model/shop/ShopDetail.svelte';
import { onMount } from 'svelte';
import { projectFirestore } from '../firebase/config';
import Loading from '../components/ui/Loading.svelte';

let shop: any = {};

const getFirestore = async () => {
  const ref = await projectFirestore.collection('shops').doc(id);
  const snapshot = await ref.get();
  const result = { ...snapshot.data(), id: snapshot.id };
  console.log(result);
  shop = result;
};

onMount(async () => {
  getFirestore();
  console.log(shop, 'shop details');
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if !shop}
    <Loading />
  {:else}
    <ShopDetail ready="{ready}" shop="{shop}" />
  {/if}
</div>

<style lang="scss"></style>
