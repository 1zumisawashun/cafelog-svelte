<script lang="ts">
import { onMount } from 'svelte';
import UserTab from '../components/model/user/UserTab.svelte';
import Loading from '../components/ui/Loading.svelte';
import { firebaseUseCase } from '../middleware/firebaseClient';
import type { Field } from '../@types/index';
let shops: Array<Field> = [];

onMount(async () => {
  shops = await firebaseUseCase.fetchAll();
  console.log(shops, 'firebaseUseCase on User.svelte');
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if shops.length === 0}
    <Loading />
  {:else}
    <UserTab shops="{shops}" />
  {/if}
</div>
