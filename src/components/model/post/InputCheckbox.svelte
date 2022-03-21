<script lang="ts">
// NOTE:複数選択から1つ以上を選ぶ場合はcheckboxを使う
export let items: Array<number | string> = [];
export let name: string = '';
let selections: Array<string> = [];
import { createEventDispatcher } from 'svelte';
let dispatch = createEventDispatcher();

const handleChange = () => {
  console.log(selections, 'selections');
  dispatch('change-handler', selections);
};
</script>

<div class="input-checkbox-container">
  {#each items as item}
    <div class="wrapper">
      <input
        type="checkbox"
        id="{String(item)}"
        name="{name}"
        value="{item}"
        bind:group="{selections}"
        on:change="{handleChange}"
        class="checkbox" />
      <label for="{String(item)}" class="button btn -mw100">{item}</label>
    </div>
  {/each}
</div>
