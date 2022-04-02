<script lang="ts">
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
export let items: Array<string>;
export let activeItem: string;
</script>

<div class="user-tab-header-container">
  <ul class="wrapper">
    {#each items as item}
      <li on:click="{() => dispatch('tabChange', item)}" class="tab">
        <div class:active="{item === activeItem}">{item}</div>
      </li>
    {/each}
  </ul>
</div>
