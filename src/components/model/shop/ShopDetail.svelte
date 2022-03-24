<script lang="ts">
export let ready;
export let shop;
import ShopComment from './ShopTabComment.svelte';
import ShopInformationTable from './ShopTabInformation.svelte';
import Map from './ShopMap.svelte';
import ShopPhoto from './ShopTabPhoto.svelte';
import ShopTabHeader from './ShopTabHeader.svelte';
import { firestoreUseCase } from '../../../middleware/firestoreClient';
import { navigate } from 'svelte-routing';
import ModalConfirm from '../../../components/ui/ModalConfirm.svelte';

//tabs
let items = ['Shop Information', 'Shop Comment', 'Shop Photo'];
let activeItem = 'Shop Information';
let setToggleModal: boolean = false;

const tabChange = (e) => {
  activeItem = e.detail;
};

const handleDelete = () => {
  firestoreUseCase.deleteDocument(shop.id);
  navigate('/', { replace: true });
};

const openModal = () => {
  setToggleModal = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  setToggleModal = false;
  document.body.style.overflow = '';
};

const handleEdit = () => {
  console.log('edit');
};
</script>

<div class="shop-detail-container">
  <img src="{shop.photoUrls}" alt="" class="image" />
  <h1 class="title">{shop.shopName}</h1>
  <div class="button-wrapper">
    <button class="btn" on:click="{openModal}">削除</button>
    <button class="btn" on:click="{handleEdit}">編集</button>
  </div>
  <div class="_mt-3">
    <ShopTabHeader
      items="{items}"
      activeItem="{activeItem}"
      on:tabChange="{tabChange}" />
    {#if activeItem === 'Shop Information'}
      <ShopInformationTable />
      {#if ready}
        <Map />
      {/if}
    {:else if activeItem === 'Shop Comment'}
      <ShopComment id="{shop.id}" comments="{shop.comments}" />
    {:else if activeItem === 'Shop Photo'}
      <ShopPhoto id="{shop.id}" photos="{shop.photos}" />
    {/if}
  </div>
  {#if setToggleModal}
    <ModalConfirm
      on:click-handler="{handleDelete}"
      on:close-modal="{closeModal}">
      <p class="message">本当に削除しますか？</p>
    </ModalConfirm>
  {/if}
</div>
