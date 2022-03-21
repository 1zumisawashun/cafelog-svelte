<script lang="ts">
import { onMount } from 'svelte';
import { navigate } from 'svelte-routing';
import loadImage from 'blueimp-load-image';
import InputFileMultiple from './InputFileMultiple.svelte';
import InputRadio from './InputRadio.svelte';
import InputCheckbox from './InputCheckbox.svelte';
import { authStore } from '../../../store/authStore';
import { projectStorage, projectFirestore } from '../../../firebase/config';
import type { firebase } from '../../../firebase/config';
import type { Field } from '../../../@types/index';
import ModalMessage from '../../ui/ModalMessage.svelte';

const tags = ['wifi', 'date', 'study', 'reserve', 'stand', 'alone'];
const stars = [1, 2, 3, 4, 5];
const openOrClose = ['開店', '閉店'];

let fields: Field = {
  shopName: '',
  station: '',
  photoUrls: [],
  comment: '',
  address: '',
  tel: '',
  tags: [],
  starRating: 0,
  businessHours: '',
  openOrClose: '',
  longitude: '', // 緯度
  latitude: '', // 経度
};

let errors = { shopName: '', station: '', photos: '' };
let valid = false;
let user: firebase.User;
let localPhotos: Array<File>;
let setToggleModal: boolean = false;

const unsub = authStore.subscribe((data) => {
  user = data;
});

onMount(() => {
  unsub();
  console.log(user, 'get user store on mount');
});

const getPhotoUrls = async () => {
  const promises = localPhotos.map(async (file): Promise<string> => {
    const data = await loadImage(file, {
      maxWidth: 500,
      canvas: true,
    });
    return new Promise((resolve, reject) => {
      (data.image as HTMLCanvasElement).toBlob(
        async (blob) => {
          if (!blob) return reject('error');
          const uploadPath = `photos/${user.uid}/${file.name}`;
          const img = await projectStorage.ref(uploadPath).put(blob);
          const imgUrl = await img.ref.getDownloadURL();
          resolve(imgUrl);
        },
        file.type,
        0.7,
      );
    });
  });

  fields.photoUrls = await Promise.all(promises);
};

const handleUpload = (e) => {
  localPhotos = e.detail;
};

const handleChange = (e, data) => {
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
    await getPhotoUrls();
    // NOTE:上記でFileでなくなるのでエラーが起きる
    const { uid, displayName, photoURL, email } = user;
    let post = { ...fields, user: { uid, displayName, photoURL, email } };
    console.log(post, 'post');
    try {
      projectFirestore.collection('shops').add(post);
      openModal();
    } catch (error) {
      console.log(error);
    }
  }
};

const openModal = () => {
  setToggleModal = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  setToggleModal = false;
  document.body.style.overflow = '';
  console.log('close-modal');
  navigate('/', { replace: true });
};
</script>

<div class="post-form-container">
  <div class="form">
    <InputFileMultiple
      photos="{localPhotos}"
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

{#if setToggleModal}
  <div class="common-container">
    <ModalMessage on:close-modal="{closeModal}" />
  </div>
{/if}
