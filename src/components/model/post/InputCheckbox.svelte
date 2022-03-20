<script lang="ts">
// NOTE:複数選択から1つ以上を選ぶ場合はcheckboxを使う
export let items: Array<number | string> = [];
export let name: string = '';
let selections: Array<string> = [];
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
        class="checkbox" />
      <label for="{String(item)}" class="button btn">{item}</label>
    </div>
  {/each}
</div>
