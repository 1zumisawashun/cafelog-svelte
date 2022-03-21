<script lang="ts">
import { Router, Link, Route } from 'svelte-routing';
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

const closeModal = () => {
  dispatch('close-modal');
};
</script>

<Router>
  <div class="execute-modal">
    <div class="overlay" use:style="{styles}">
      <div class="wrapper">
        <p class="message">成功しました</p>
        <div class="buttons">
          <Link to="/">
            <button class="btn -mw150" on:click="{closeModal}">トップへ</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</Router>
