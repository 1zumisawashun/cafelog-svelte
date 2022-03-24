<script lang="ts">
import { searchContent } from '../../../middleware/utilities';
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

<style>
.search-form-container {
  width: 50%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1%;
}
.search-block {
  width: calc(50% - 1%);
  position: relative;
}
.search-block img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.search-content {
  width: 100%;
  padding: 10% 5%;
  text-align: center;
  position: absolute;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.4);
  /* 自由に位置指定  */
  position: absolute;
  left: 0;
  top: 0;
  /* これを入れないと上手く被せられない  */
  height: 200px;
  content: '';
}
.main-message {
  color: white;
  font-weight: bold;
  font-size: 17px;
  margin: 0 0 20px 0;
}
.sub-message {
  color: white;
  font-size: 13px;
}
</style>
