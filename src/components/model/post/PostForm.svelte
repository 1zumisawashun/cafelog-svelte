<script lang="ts">
type Field = {
  shop_name: string;
  station: string;
  photos: Array<File>;
  comment: string;
  address: string;
  tel: string;
  tag: string;
  star_rating: string;
  day_off: string;
  open: boolean;
  longitude: string; // 緯度
  latitude: string; // 経度
};
const tags = ['wifi', 'date', 'study', 'reserve', 'stand', 'alone'];
const stars = [1, 2, 3, 4, 5];
const openOrClose = ['開店', '閉店'];

import InputFileMultiple from './InputFileMultiple.svelte';
import InputRadio from './InputRadio.svelte';
import InputCheckbox from './InputCheckbox.svelte';
import { createEventDispatcher } from 'svelte';
let dispatch = createEventDispatcher();
let fields: Field = {
  shop_name: '',
  station: '',
  photos: [],
  comment: '',
  address: '',
  tel: '',
  tag: '',
  star_rating: '',
  day_off: '',
  open: false,
  longitude: '', // 緯度
  latitude: '', // 経度
};
let errors = { shop_name: '', thumbnail: '' };
let valid = false;

const handleUpload = (e) => {
  fields.photos = e.detail;
  console.log(fields.photos, e, 'handle-upload');
};

const submitHandler = () => {
  valid = true;
  // validation question
  if (fields.shop_name.trim().length < 1) {
    valid = false;
    errors.shop_name = 'shop name cannot be empty';
  } else {
    errors.shop_name = '';
  }
  // validation Answer A
  // if (fields.thumbnail.trim().length < 1) {
  //   valid = false;
  //   errors.thumbnail = 'thumbnail cannot be empty';
  // } else {
  //   errors.thumbnail = '';
  // }
  // add post
  if (valid) {
    let post = { ...fields };
    // NOTE:user情報を入れる
    console.log(fields);
    dispatch('add', post);
  }
};
</script>

<div class="post-form-container">
  <div class="form">
    <InputFileMultiple
      photos="{fields.photos}"
      on:change-handler="{handleUpload}" />
    <InputRadio items="{stars}" name="stars" />
    <InputRadio items="{openOrClose}" name="openOrClose" />
    <InputCheckbox items="{tags}" name="tags" />
    <!-- 名前 -->
    <div class="form-field">
      <label class="label" for="shop_name">shop name:</label>
      <input
        class="input"
        type="text"
        id="shop_name"
        bind:value="{fields.shop_name}" />
      <div class="error">{errors.shop_name}</div>
    </div>

    <!-- 最寄り駅 -->
    <div class="form-field">
      <label class="label" for="station">station:</label>
      <input
        class="input"
        type="text"
        id="station"
        bind:value="{fields.station}" />
    </div>

    <!-- 住所 -->
    <div class="form-field">
      <label class="label" for="address">shop address:</label>
      <input
        class="input"
        type="text"
        id="address"
        bind:value="{fields.address}" />
    </div>

    <!-- 電話番号 -->
    <div class="form-field">
      <label class="label" for="tel">shop tel:</label>
      <input class="input" type="text" id="tel" bind:value="{fields.tel}" />
    </div>

    <!-- コメント -->
    <div class="form-field">
      <label class="label" for="comment">comment</label>
      <input
        class="input"
        type="text"
        id="comment"
        bind:value="{fields.comment}" />
    </div>

    <button on:click="{submitHandler}" class="btn">Post</button>
  </div>
</div>
