<script lang="ts">
import ShopModalForm from './ShopModalForm.svelte';
import InputFileSingle from './InputFileSingle.svelte';
let localPhotos: Array<File>;
let setToggleModal = false;

const handleUpload = (e) => {
  localPhotos = e.detail;
  console.log('handle-upload');
};

const openModal = () => {
  console.log('open-modal');
  setToggleModal = true;
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  console.log('close-modal');
  setToggleModal = false;
  document.body.style.overflow = '';
  localPhotos = null;
};

const postComment = () => {
  console.log(localPhotos, 'post-comment');
};
</script>

<div class="shop-photo-container">
  {#each [...Array(5)] as _, index}
    <div class="image-block">
      <img src="https://placehold.jp/200x200.png" class="picture" alt="" />
    </div>
  {/each}
</div>
<div class="button-wrapper">
  <button class="btn" on:click="{openModal}">追加する</button>
  <button class="btn">もっと見る</button>
</div>

{#if setToggleModal}
  <ShopModalForm on:close-modal="{closeModal}" on:click-handler="{postComment}">
    <div class="post-form-container">
      <div class="form">
        <InputFileSingle
          photos="{localPhotos}"
          on:change-handler="{handleUpload}" />
      </div>
    </div>
  </ShopModalForm>
{/if}
