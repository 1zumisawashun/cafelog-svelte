<script lang="ts">
import { searchContent } from '../../../middleware/constants';
import { Router, Link, Route } from 'svelte-routing';
</script>

<div class="search-form-container">
  <Router>
    {#each searchContent as content}
      <div class="search-block">
        <Link to="{`/search/result?tag=${content.tag}`}">
          <img src="{`assets/image/${content.imagePath}.jpg`}" alt="" />
          <div class="search-content">
            <p class="main-message">{content.mainMessage}</p>
            <p class="sub-message">
              {content.subMessage}
            </p>
          </div>
        </Link>
      </div>
    {/each}
  </Router>
</div>
