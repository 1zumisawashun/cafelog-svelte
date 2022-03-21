<script lang="ts">
import { style } from '../../middleware/style';

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
</script>

<div class="overlay" use:style="{styles}">
  <div class="wrapper">
    <div class="loading-container"></div>
  </div>
</div>
