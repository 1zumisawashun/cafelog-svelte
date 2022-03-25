<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { mineType } from '../../../middleware/constants';
let dispatch = createEventDispatcher();

export let photos: Array<File> = [];
let isFileTypeError: boolean = false;
let files: Array<File>;

const resetErrors = () => {
  isFileTypeError = false;
};

const handleFile = async ({ target }) => {
  if (target.files === null || target.files.length === 0) {
    return;
  }
  files = Object.values((target as HTMLInputElement).files).concat();
  // NOTE:初期化することで同じファイルを連続で選択してもonChagngeが発動するように設定し、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応
  target.value = '';
  resetErrors();

  photos = files.filter((file) => {
    // first validation
    if (!mineType.includes(file.type)) {
      isFileTypeError = true;
      return false;
    }
    return true;
  });

  if (photos.length === 0) {
    return;
  }
  console.log(photos, 'photos');
  dispatch('change-handler', photos);
};
</script>

<div class="input-file-multiple-container -center">
  <div>
    <div class="wrapper">
      {#if photos[0]}
        <img
          src="{URL.createObjectURL(photos[0])}"
          alt=""
          width="150"
          class="image" />
      {:else}
        <label class="wrapper" for="photos">
          <img src="https://placehold.jp/150x200.png" alt="" class="image" />
        </label>
      {/if}
    </div>
  </div>
</div>

{#if isFileTypeError}
  <p class="error">
    ※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません
  </p>{/if}

<div class="button-wrapper _mt-0">
  <button class="btn"><label for="photos">upload</label></button>
</div>

<input
  type="file"
  name="photos"
  id="photos"
  accept="image/*"
  on:change="{handleFile}"
  hidden />
