<script lang="ts">
import { style } from '../../middleware/style';
import { createEventDispatcher } from 'svelte';
let dispatch = createEventDispatcher();

const scrollTop = (): number => {
  let scrollingElementTop: number = 0;

  if (document.scrollingElement) {
    scrollingElementTop = document.scrollingElement.scrollTop;
  }

  return Math.max(
    window.scrollY,
    window.pageYOffset,
    document.body.scrollTop,
    document.documentElement.scrollTop,
    scrollingElementTop,
  );
};

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
  <div class="wrapper -form">
    <slot />
    <div class="buttons">
      <button class="btn -mw150 -inverse" on:click="{handleClick}">はい</button>
      <button class="btn -mw150" on:click="{closeModal}">いいえ</button>
    </div>
  </div>
</div>
