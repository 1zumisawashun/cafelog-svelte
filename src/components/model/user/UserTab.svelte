<script lang="ts">
import UserTabHeader from './UserTabHeader.svelte';
import UserTabSaved from './UserTabSaved.svelte';
import UserTabVisited from './UserTabVisited.svelte';
import type { SavedOrVisitedShop ,FieldWithCreatedAt} from '../../../@types/index';
export let savedShops: Array<FieldWithCreatedAt>;
export let visitedShops: Array<FieldWithCreatedAt>;
//tabs
let items = ['Cafe Saved', 'Cafe Visited'];
let activeItem = 'Cafe Saved';

const tabChange = (e) => {
  activeItem = e.detail;
};
</script>

<UserTabHeader
  items="{items}"
  activeItem="{activeItem}"
  on:tabChange="{tabChange}" />
{#if activeItem === 'Cafe Saved'}
  <UserTabSaved shops="{savedShops}" />
{:else if activeItem === 'Cafe Visited'}
  <UserTabVisited shops="{visitedShops}" />
{/if}
