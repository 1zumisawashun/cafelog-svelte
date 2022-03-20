<script lang="ts">
// NOTE:複数選択から1つ選ぶ場合はradioを使う
export let items: Array<number | string> = [];
export let name: string = '';
let selection: string = '';
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
        class="radio" />
      <label for="{String(item)}" class="btn">{item}</label>
    </div>
  {/each}
</div>
