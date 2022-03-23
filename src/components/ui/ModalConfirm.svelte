<script lang="ts">
import { style } from '../../middleware/style';
import { createEventDispatcher } from 'svelte';
import { scrollTop } from '../../utilities/utilities';
let dispatch = createEventDispatcher();
let styles = { top: `${scrollTop()}px` };

const handleClick = () => {
  dispatch('click-handler');
  dispatch('close-modal');
};
const closeModal = () => {
  dispatch('close-modal');
};
</script>

<div class="overlay" use:style="{styles}">
  <div class="wrapper -form -small">
    <slot />
    <div class="button-wrapper">
      <button class="btn -mw150 -inverse" on:click="{handleClick}">はい</button>
      <button class="btn -mw150" on:click="{closeModal}">いいえ</button>
    </div>
  </div>
</div>
