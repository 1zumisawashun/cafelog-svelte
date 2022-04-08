<script lang="ts">
import InputFileMultiple from '../post/InputFileMultiple.svelte';
import InputRadio from '../post/InputRadio.svelte';
import InputCheckbox from '../post/InputCheckbox.svelte';
import type {
  FieldWithoutIdAndUser,
  FieldWithoutId,
  User,
} from '../../../@types/index';
import { getPhotoUrls } from '../../../middleware/storageClient';
import { createEventDispatcher } from 'svelte';
let dispatch = createEventDispatcher();

const tags = ['wifi', 'date', 'study', 'reserve', 'stand', 'alone'];
const stars = [1, 2, 3, 4, 5];
const openOrClose = ['開店', '閉店'];

let errors = { shopName: '', station: '', photos: '' };
let valid = false;
let localPhotos: Array<File | string> = [];
export let user: User;
export let fields: FieldWithoutIdAndUser;

$: stringItems = localPhotos.filter(
  (item): item is string => typeof item === 'string',
);
$: fileItems = localPhotos.filter(
  (item): item is File => typeof (item as File).size === 'number',
);

// FIXME:カスタムイベントの型定義について調査する
const handleUpload = (e: CustomEvent) => {
  console.log(e.detail, 'handle upload');
  localPhotos = e.detail;
};

const handleChange = (e: CustomEvent, data: string) => {
  if (data === 'stars') fields.starRating = e.detail;
  if (data === 'open-or-close') fields.openOrClose = e.detail;
  if (data === 'tags') fields.tags = e.detail;
};

const submitHandler = async () => {
  valid = true;
  // validation shop name
  if (fields.shopName.trim().length < 1) {
    valid = false;
    errors.shopName = 'shop name cannot be empty';
  } else {
    errors.shopName = '';
  }
  // validation photos
  if (localPhotos.length < 1) {
    valid = false;
    errors.photos = 'photos cannot be empty';
  } else {
    errors.photos = '';
  }
  // validation station
  if (fields.station.trim().length < 1) {
    valid = false;
    errors.station = 'station cannot be empty';
  } else {
    errors.station = '';
  }
  // add post
  if (valid) {
    const results = await getPhotoUrls(fileItems, user.uid);
    fields.photoUrls = [...results, ...stringItems];
    let post: FieldWithoutId = {
      ...fields,
      user,
    };
    try {
      dispatch('click-handler', post);
      dispatch('close-modal');
    } catch (error) {
      console.log(error);
    }
  }
};
const closeModal = () => {
  dispatch('close-modal');
};
</script>

<div class="post-form-container -w90">
  <div class="form">
    <InputFileMultiple
      photos="{fields.photoUrls}"
      on:change-handler="{handleUpload}" />
    <div class="error">{errors.photos}</div>
    <!-- 名前 -->
    <div class="form-field">
      <label class="label" for="shop_name">shop name</label>
      <input
        class="input"
        type="text"
        id="shop_name"
        bind:value="{fields.shopName}" />
      <div class="error">{errors.shopName}</div>
    </div>

    <!-- 最寄り駅 -->
    <div class="form-field">
      <label class="label" for="station">station</label>
      <input
        class="input"
        type="text"
        id="station"
        bind:value="{fields.station}" />
      <div class="error">{errors.station}</div>
    </div>

    <!-- 住所 -->
    <div class="form-field">
      <label class="label" for="address">shop address</label>
      <input
        class="input"
        type="text"
        id="address"
        bind:value="{fields.address}" />
    </div>

    <!-- 電話番号 -->
    <div class="form-field">
      <label class="label" for="tel">shop tel</label>
      <input class="input" type="text" id="tel" bind:value="{fields.tel}" />
    </div>

    <div class="form-field">
      <label class="label" for="">stars</label>
      <InputRadio
        items="{stars}"
        name="stars"
        selection="{fields.starRating}"
        on:change-handler="{(e) => handleChange(e, 'stars')}" />
    </div>
    <div class="form-field">
      <label class="label" for="">open or close</label>
      <InputRadio
        items="{openOrClose}"
        name="openOrClose"
        selection="{fields.openOrClose}"
        on:change-handler="{(e) => handleChange(e, 'open-or-close')}" />
    </div>
    <div class="form-field">
      <label class="label" for="">tags</label>
      <InputCheckbox
        items="{tags}"
        name="tags"
        selections="{fields.tags}"
        on:change-handler="{(e) => handleChange(e, 'tags')}" />
    </div>

    <!-- コメント -->
    <div class="form-field">
      <label class="label" for="comment">comment</label>
      <textarea class="input" id="comment" bind:value="{fields.comment}"
      ></textarea>
    </div>

    <div class="button-wrapper">
      <button on:click="{submitHandler}" class="btn -mw150 -inverse"
        >更新する</button>
      <button on:click="{closeModal}" class="btn -mw150">閉じる</button>
    </div>
  </div>
</div>
