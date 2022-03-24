<script lang="ts">
import { onMount } from 'svelte';
import ShopList from '../components/model/shop/ShopList.svelte';
import Loading from '../components/ui/Loading.svelte';
import { firebaseUseCase } from '../middleware/firebaseClient';
import type { Field } from '../@types/index';
let shops: Array<Field> = [];

onMount(async () => {
  shops = await firebaseUseCase.fetchAll();
  console.log(shops, 'firebaseUseCase on Home.svelte');
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if shops.length === 0}
    <Loading />
  {:else}
    <ShopList shops="{shops}" />
  {/if}
</div>
