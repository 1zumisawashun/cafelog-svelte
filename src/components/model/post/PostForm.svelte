<script lang="ts">
type Field = {
  shop_name: string;
  station: string;
  photos: Array<File>;
  comment: string;
  address: string;
  tel: string;
  tags: Array<string>;
  star_rating: number;
  business_hours: string;
  openOrClose: string;
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
  tags: [],
  star_rating: 0,
  business_hours: '',
  openOrClose: '',
  longitude: '', // 緯度
  latitude: '', // 経度
};
let errors = { shop_name: '', station: '', photos: '', star_rating: '' };
let valid = false;

const handleUpload = (e) => {
  fields.photos = e.detail;
  console.log(fields.photos, e, 'handle-upload');
};
const handleChange = (e, data) => {
  if (data === 'stars') fields.star_rating = e.detail;
  if (data === 'open-or-close') fields.openOrClose = e.detail;
  if (data === 'tags') fields.tags = e.detail;
  console.log(e.detail, data);
};

const submitHandler = () => {
  valid = true;
  // validation shop name
  if (fields.shop_name.trim().length < 1) {
    valid = false;
    errors.shop_name = 'shop name cannot be empty';
  } else {
    errors.shop_name = '';
  }
  // validation photos
  if (fields.photos.length < 1) {
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
  // validation shop name
  if (!fields.star_rating) {
    valid = false;
    errors.star_rating = 'star rating cannot be empty';
  } else {
    errors.star_rating = '';
  }
  // add post
  if (valid) {
    let post = { ...fields };
    // NOTE:storeから取得したuser情報を入れる
    console.log(fields, 'fields');
    dispatch('add', post);
  }
};
</script>

<div class="post-form-container">
  <div class="form">
    <InputFileMultiple
      photos="{fields.photos}"
      on:change-handler="{handleUpload}" />
    <div class="error">{errors.photos}</div>
    <!-- 名前 -->
    <div class="form-field">
      <label class="label" for="shop_name">shop name</label>
      <input
        class="input"
        type="text"
        id="shop_name"
        bind:value="{fields.shop_name}" />
      <div class="error">{errors.shop_name}</div>
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

    <!-- 緯度 -->
    <div class="form-field">
      <label class="label" for="longitude">longitude</label>
      <input
        class="input"
        type="text"
        id="longitude"
        bind:value="{fields.longitude}" />
    </div>

    <!-- 経度 -->
    <div class="form-field">
      <label class="label" for="latitude">latitude</label>
      <input
        class="input"
        type="text"
        id="latitude"
        bind:value="{fields.latitude}" />
    </div>

    <div class="form-field">
      <label class="label" for="">stars</label>
      <InputRadio
        items="{stars}"
        name="stars"
        on:change-handler="{(e) => handleChange(e, 'stars')}" />
      <div class="error">{errors.star_rating}</div>
    </div>
    <div class="form-field">
      <label class="label" for="">open or close</label>
      <InputRadio
        items="{openOrClose}"
        name="openOrClose"
        on:change-handler="{(e) => handleChange(e, 'open-or-close')}" />
    </div>
    <div class="form-field">
      <label class="label" for="">tags</label>
      <InputCheckbox
        items="{tags}"
        name="tags"
        on:change-handler="{(e) => handleChange(e, 'tags')}" />
    </div>

    <!-- コメント -->
    <div class="form-field">
      <label class="label" for="comment">comment</label>
      <textarea class="input" id="comment" bind:value="{fields.comment}"
      ></textarea>
    </div>

    <button on:click="{submitHandler}" class="btn">Post</button>
  </div>
</div>
