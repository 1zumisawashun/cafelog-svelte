<script lang="ts">
import ShopModalForm from './ShopModalForm.svelte';
let setToggleModal = false;
let comment = '';

const openModal = () => {
  console.log('open-modal');
  setToggleModal = true;
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  console.log('close-modal');
  setToggleModal = false;
  document.body.style.overflow = '';
  comment = '';
};

const postComment = () => {
  console.log(comment, 'post-comment');
};
</script>

<div class="shop-comment-container">
  {#each [...Array(5)] as _, index}
    <div class="balloon6">
      <div class="faceicon">
        <img src="https://placehold.jp/200x200.png" class="" alt="" />
      </div>
      <div class="chatting">
        <div class="says">
          <p>
            これはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれはテストこれれはテストこれはテストこれは
          </p>
        </div>
      </div>
    </div>
  {/each}
  <div class="button-wrapper">
    <button class="btn" on:click="{openModal}">追加する</button>
    <button class="btn">もっと見る</button>
  </div>
</div>

{#if setToggleModal}
  <ShopModalForm on:close-modal="{closeModal}" on:click-handler="{postComment}">
    <div class="post-form-container">
      <div class="form">
        <div class="form-field">
          <label class="label" for="comment">comment</label>
          <textarea class="input" id="comment" bind:value="{comment}"
          ></textarea>
        </div>
      </div>
    </div>
  </ShopModalForm>
{/if}
