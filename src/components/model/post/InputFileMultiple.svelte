<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { mineType } from '../../../middleware/constants';
let dispatch = createEventDispatcher();

export let photos: Array<File> = [];
let isSameError: boolean = false;
let isNumberError: boolean = false;
let isFileTypeError: boolean = false;
let files: Array<File>;

const resetErrors = () => {
  isSameError = false;
  isNumberError = false;
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
  // NOTE:連続で同じ画像をポストする際 handleFile が発火しないので初期化する
  target.value = '';
  resetErrors();

  const pickedPhotos = files.filter((file) => {
    if (!mineType.includes(file.type)) {
      isFileTypeError = true;
      return false;
    }
    const existsSameSize = photos.some((photo) => photo.size === file.size);
    if (existsSameSize) {
      isSameError = true;
      return false;
    }
    return true;
  });

  if (pickedPhotos.length === 0) {
    return;
  }

  const addedPhotos = [...photos, ...pickedPhotos];
  if (addedPhotos.length >= 4) {
    isNumberError = true;
  }
  // NOTE:sliceで4枚目の画像を排除し3枚にする
  photos = addedPhotos.slice(0, 3);
  dispatch('change-handler', photos);
};
</script>

<div class="input-file-multiple-container -scroll">
  {#each [...Array(3)] as _, index}
    <div>
      <div class="wrapper">
        {#if photos[index]}
          <img
            src="{URL.createObjectURL(photos[index])}"
            alt="{`あなたの写真 ${index + 1}`}"
            width="150"
            class="image" />
        {:else}
          <label class="wrapper" for="photos">
            <img src="https://placehold.jp/150x200.png" alt="" class="image" />
          </label>
        {/if}
      </div>
    </div>
  {/each}
</div>

{#if isSameError}<p class="error">
    ※既に選択された画像と同じものは表示されません
  </p>{/if}
{#if isNumberError}<p class="error">
    ※3枚を超えて選択された画像は表示されません
  </p>{/if}
{#if isFileTypeError}
  <p class="error">
    ※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません
  </p>{/if}

<div class="button-wrapper">
  <button class="btn"><label for="photos">upload</label></button>
</div>

<input
  type="file"
  name="photos"
  id="photos"
  accept="image/*"
  on:change="{handleFile}"
  multiple />
