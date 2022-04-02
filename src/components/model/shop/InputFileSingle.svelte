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

const handleFile = async (e: Event) => {
  let target = e.target as HTMLInputElement;
  if (target.files === null || target.files.length === 0) {
    return;
  }

  if (target.files !== null) {
    // NOTE:Array<File>に整形しコピーする
    files = [...Object.values(target.files)];
  }
  // NOTE:連続で同じ画像をポストする際 handleFile が発火しないので初期化するtarget.value = '';
  resetErrors();

  photos = files.filter((file) => {
    if (!mineType.includes(file.type)) {
      isFileTypeError = true;
      return false;
    }
    return true;
  });

  if (photos.length === 0) {
    return;
  }
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
