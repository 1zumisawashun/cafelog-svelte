<script lang="ts">
import Loading from '../components/ui/Loading.svelte';
import SearchMultiple from '../components/model/search/SearchMultiple.svelte';
import { delay } from '../middleware/utilities';
import { onMount } from 'svelte';
let isPending: boolean = true;

onMount(async () => {
  await delay(500);
  isPending = false;
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if isPending}
    <Loading />
  {:else}
    <SearchMultiple />
  {/if}
</div>

<style lang="scss"></style>
