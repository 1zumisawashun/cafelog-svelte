<script lang="ts">
import { style } from '../../middleware/style';
import { createEventDispatcher } from 'svelte';
import { scrollTop } from '../../utilities/utilities';
let dispatch = createEventDispatcher();
let styles = { top: `${scrollTop()}px` };

const closeModal = () => {
  dispatch('close-modal');
};
</script>

<div class="overlay" use:style="{styles}">
  <div class="wrapper -form -small">
    <p class="message">成功しました</p>
    <div class="button-wrapper">
      <button class="btn -mw150" on:click="{closeModal}">トップへ</button>
    </div>
  </div>
</div>
