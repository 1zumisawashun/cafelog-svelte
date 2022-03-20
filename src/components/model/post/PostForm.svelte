<script lang="ts">
type Field = {
  shop_name: string;
  station: string;
  thumbnail: string;
  comment: string;
};
import InputFileMultiple from './InputFileMultiple.svelte';
import { createEventDispatcher } from 'svelte';
let dispatch = createEventDispatcher();
let fields: Field = {
  shop_name: '',
  station: '',
  thumbnail: '',
  comment: '',
};
let errors = { shop_name: '', thumbnail: '' };
let valid = false;

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
  if (fields.thumbnail.trim().length < 1) {
    valid = false;
    errors.thumbnail = 'thumbnail cannot be empty';
  } else {
    errors.thumbnail = '';
  }
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
    <InputFileMultiple />
    <div class="form-field">
      <label class="label" for="shop_name">shop name:</label>
      <input
        class="input"
        type="text"
        id="shop_name"
        bind:value="{fields.shop_name}" />
      <div class="error">{errors.shop_name}</div>
    </div>
    <div class="form-field">
      <label class="label" for="station">station:</label>
      <input
        class="input"
        type="text"
        id="station"
        bind:value="{fields.station}" />
    </div>
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
