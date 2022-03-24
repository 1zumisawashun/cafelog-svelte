<script lang="ts">
import { onMount } from 'svelte';
// import { navigate } from 'svelte-routing';
import ShopModalForm from './ShopModalForm.svelte';
import InputFileSingle from './InputFileSingle.svelte';
import type { Photo } from '../../../@types/index';
import { authStore } from '../../../store/authStore';
import type { firebase } from '../../../firebase/config';
import { timestamp } from '../../../firebase/config';
import { firestoreUseCase } from '../../../middleware/firestoreClient';
import { getPhotoUrls } from '../../../middleware/storageClient';
export let id;
export let photos: Array<Photo>;

let localPhotos: Array<File>;
let setToggleModal = false;
let user: firebase.User;

const unsub = authStore.subscribe((data) => {
  user = data;
});

onMount(async () => {
  unsub();
});

const handleUpload = (e) => {
  localPhotos = e.detail;
};

const openModal = () => {
  setToggleModal = true;
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  setToggleModal = false;
  document.body.style.overflow = '';
  localPhotos = null;
};

const postPhoto = async () => {
  const { displayName, photoURL, uid } = user;
  const result = await getPhotoUrls(localPhotos, uid);
  const post: Photo = {
    id: Math.random(),
    photo: result[0],
    displayName,
    photoURL,
    createdAt: timestamp.fromDate(new Date()),
  };
  firestoreUseCase.addSubDocument(post, id, 'photo');
};
</script>

<div class="shop-photo-container">
  {#if photos.length !== 0}
    {#each photos as photo}
      <div class="image-block">
        <img src="{photo.photo}" class="picture" alt="" />
      </div>
    {/each}
  {:else}
    {#each [...Array(5)] as _, index}
      <div class="image-block">
        <img src="https://placehold.jp/200x200.png" class="picture" alt="" />
      </div>
    {/each}
  {/if}
</div>
<div class="button-wrapper">
  <button class="btn" on:click="{openModal}">追加する</button>
  <button class="btn">もっと見る</button>
</div>

{#if setToggleModal}
  <ShopModalForm on:close-modal="{closeModal}" on:click-handler="{postPhoto}">
    <div class="post-form-container">
      <div class="form">
        <InputFileSingle
          photos="{localPhotos}"
          on:change-handler="{handleUpload}" />
      </div>
    </div>
  </ShopModalForm>
{/if}
