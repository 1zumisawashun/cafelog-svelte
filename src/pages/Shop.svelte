<script lang="ts">
export let id;
export let ready;
import ShopDetail from '../components/model/shop/ShopDetail.svelte';
import { onMount } from 'svelte';
import { projectFirestore } from '../firebase/config';

let shop: any = {};

const getFirestore = async () => {
  const ref = await projectFirestore.collection('shops').doc(id);
  const snapshot = await ref.get();
  const result = { ...snapshot.data(), id: snapshot.id };
  shop = result;
};

onMount(async () => {
  getFirestore();
  console.log(shop, 'shop details');
});
</script>

<div class="common-container _pt-5 _pb-5">
  <ShopDetail ready="{ready}" shop="{shop}" />
</div>

<style lang="scss"></style>
