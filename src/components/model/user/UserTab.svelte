<script lang="ts">
import UserTabHeader from './UserTabHeader.svelte';
import UserTabSaved from './UserTabSaved.svelte';
import UserTabVisited from './UserTabVisited.svelte';
import { onMount } from 'svelte';
import { projectFirestore } from '../../../firebase/config';
import { shopStore } from '../../../store/shopStore';
// import Loading from '../../../components/ui/Loading.svelte';
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
});

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
  <UserTabSaved shops="{shops}" />
{:else if activeItem === 'Cafe Visited'}
  <UserTabVisited shops="{shops}" />
{/if}
