<script lang="ts">
export let id;
export let ready;
import ShopDetail from '../components/model/shop/ShopDetail.svelte';
import { onMount } from 'svelte';
import Loading from '../components/ui/Loading.svelte';
import { firebaseUseCase } from '../middleware/firebaseClient';
import type { Field } from '../@types/index';
let shop: Field;

onMount(async () => {
  shop = await firebaseUseCase.fetchItem(id);
  console.log(shop, 'firebaseUseCase on Shop.svelte');
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if !shop}
    <Loading />
  {:else}
    <!-- このタイミングでコメントと写真を送る -->
    <ShopDetail ready="{ready}" shop="{shop}" />
  {/if}
</div>

<style lang="scss"></style>
