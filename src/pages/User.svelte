<script lang="ts">
import { onMount } from 'svelte';
import UserTab from '../components/model/user/UserTab.svelte';
import Loading from '../components/ui/Loading.svelte';
import { shopUseCase } from '../middleware/firebaseClient';
let shops: Array<any> = [];

onMount(async () => {
  shops = await shopUseCase.fetchAll();
  console.log(shops, 'shopUseCase on User.svelte');
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if shops.length === 0}
    <Loading />
  {:else}
    <UserTab shops="{shops}" />
  {/if}
</div>
