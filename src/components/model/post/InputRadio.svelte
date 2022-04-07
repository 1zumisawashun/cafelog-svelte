<script lang="ts">
// NOTE:複数選択から1つ選ぶ場合はradioを使う
export let items: Array<number | string> = [];
export let name: string = '';
export let selection: string | number;
import { createEventDispatcher } from 'svelte';
let dispatch = createEventDispatcher();

const handleChange = () => {
  console.log(selection, 'selection');
  dispatch('change-handler', selection);
};
</script>

<div class="input-radio-container">
  {#each items as item}
    <div class="wrapper">
      <input
        type="radio"
        id="{String(item)}"
        name="{name}"
        value="{item}"
        bind:group="{selection}"
        on:change="{handleChange}"
        class="radio" />
      <label for="{String(item)}" class="btn -mw100">{item}</label>
    </div>
  {/each}
</div>
