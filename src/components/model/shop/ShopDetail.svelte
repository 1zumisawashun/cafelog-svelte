<script lang="ts">
export let ready;
export let shop;
export let user;
import ShopComment from './ShopTabComment.svelte';
import ShopInformationTable from './ShopTabInformation.svelte';
import Map from './ShopMap.svelte';
import ShopPhoto from './ShopTabPhoto.svelte';
import ShopTabHeader from './ShopTabHeader.svelte';
import { firestoreUseCase } from '../../../middleware/firestoreClient';
import { navigate } from 'svelte-routing';
import ModalConfirm from '../../../components/ui/ModalConfirm.svelte';
import SaveOnIcon from '../../../assets/icon/icon_save_on.svg';
import FlagOnIcon from '../../../assets/icon/icon_flag_on.svg';
import SaveOffIcon from '../../../assets/icon/icon_save_off.svg';
import FlagOffIcon from '../../../assets/icon/icon_flag_off.svg';
import { convertedPath } from '../../../middleware/utilities';

//tabs
let items = ['Shop Information', 'Shop Comment', 'Shop Photo'];
let activeItem = 'Shop Information';
let setToggleModal: boolean = false;
let isSaved: boolean = shop.isSaved;
let isVisited: boolean = shop.isVisited;

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

const handleVisited = () => {
  const { displayName, photoURL, uid, email } = user;
  if (!isVisited) {
    try {
      firestoreUseCase.addSubDocumentWithUserRef(
        { displayName, photoURL, uid, email },
        convertedPath(`/shops/${shop.id}/visited/${uid}`),
      );
      firestoreUseCase.addSubDocumentWithShopRef(
        shop,
        convertedPath(`/users/${uid}/visited/${shop.id}`),
      );
      isVisited = true;
      return;
    } catch (error) {
      console.log(error);
      // NOTE:モーダル出したい
    }
  }
  if (isVisited) {
    try {
      firestoreUseCase.deleteSubDocumentWithUserRef(
        convertedPath(`/shops/${shop.id}/visited/${uid}`),
      );
      firestoreUseCase.deleteSubDocumentWithShopRef(
        convertedPath(`/users/${uid}/visited/${shop.id}`),
      );
      isVisited = false;
      return;
    } catch (error) {
      console.log(error);
      // NOTE:モーダル出したい
    }
  }
};
const handleSaved = () => {
  const { displayName, photoURL, uid, email } = user;
  if (!isSaved) {
    console.log('動いている？？');
    try {
      firestoreUseCase.addSubDocumentWithUserRef(
        { displayName, photoURL, uid, email },
        convertedPath(`/shops/${shop.id}/saved/${uid}`),
      );
      firestoreUseCase.addSubDocumentWithShopRef(
        shop,
        convertedPath(`/users/${uid}/saved/${shop.id}`),
      );
      isSaved = true;
      return;
    } catch (error) {
      console.log(error);
      // NOTE:モーダル出したい
    }
  }
  if (isSaved) {
    try {
      firestoreUseCase.deleteSubDocumentWithUserRef(
        convertedPath(`/shops/${shop.id}/saved/${uid}`),
      );
      firestoreUseCase.deleteSubDocumentWithShopRef(
        convertedPath(`/users/${uid}/saved/${shop.id}`),
      );
      isSaved = false;
      return;
    } catch (error) {
      console.log(error);
      // NOTE:モーダル出したい
    }
  }
};
</script>

<div class="shop-detail-container">
  <img src="{shop.photoUrls}" alt="" class="image" />
  <h1 class="title">{shop.shopName}</h1>
  <div class="button-wrapper _mt-2">
    {#if !isVisited}
      <button class="btn" on:click="{handleVisited}">
        <img src="{FlagOffIcon}" alt="" />
        <span class="text">行ったことがある</span>
      </button>
    {:else if isVisited}
      <button class="btn -orenge" on:click="{handleVisited}">
        <img src="{FlagOnIcon}" alt="" />
        <span class="text -orenge">行ったことがある</span>
      </button>
    {/if}
    {#if !isSaved}
      <button class="btn" on:click="{handleSaved}">
        <img src="{SaveOffIcon}" alt="" />
        <span class="text">保存する</span>
      </button>
    {:else if isSaved}
      <button class="btn -orenge" on:click="{handleSaved}">
        <img src="{SaveOnIcon}" alt="" />
        <span class="text -orenge">保存する</span>
      </button>
    {/if}
    <button class="btn" on:click="{openModal}">削除</button>
  </div>
  <div class="_mt-2">
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
