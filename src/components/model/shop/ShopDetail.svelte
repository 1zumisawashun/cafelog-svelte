<script lang="ts">
export let ready: boolean;
export let shop: FieldWithCommentAndPhotoAndCreatedAt;
export let user: firebase.User;
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
import ModalError from '../../../components/ui/ModalError.svelte';
import type { firebase } from '../../../firebase/config';
import type { FieldWithCommentAndPhotoAndCreatedAt } from '../../../@types/index';

//tabs
let items = ['Shop Information', 'Shop Comment', 'Shop Photo'];
let activeItem = 'Shop Information';
let setToggleModal: boolean = false;
let setToggleModalError: boolean = false;
let isSaved: boolean | undefined = shop.isSaved;
let isVisited: boolean | undefined = shop.isVisited;

const tabChange = (e: CustomEvent) => {
  activeItem = e.detail;
};

const handleDelete = () => {
  firestoreUseCase.deleteDocument(shop.id);
  navigate('/', { replace: true });
};

const openModal = () => {
  if (!user) {
    openModalError();
    return;
  }
  setToggleModal = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  setToggleModal = false;
  document.body.style.overflow = '';
};
const openModalError = () => {
  setToggleModalError = true;
  document.body.style.overflow = 'hidden';
};

const closeModalError = () => {
  setToggleModalError = false;
  document.body.style.overflow = '';
};

const handleVisited = () => {
  if (!user) {
    openModalError();
    return;
  }
  const { displayName, photoURL, uid, email } = user;
  if (!email) return;
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
    }
  }
};
const handleSaved = () => {
  if (!user) {
    openModalError();
    return;
  }
  const { displayName, photoURL, uid, email } = user;
  if (!email) return;
  if (!isSaved) {
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
    }
  }
};
</script>

<div class="shop-detail-container">
  <img src="{shop.photoUrls[0]}" alt="" class="image" />
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
      {#if ready && shop?.address}
        <Map address="{shop.address}" />
      {:else if ready && !shop?.address}
        <Map address="東京都世田谷区駒沢1-23−1" />
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
  {#if setToggleModalError}
    <ModalError on:close-modal="{closeModalError}">
      <p class="message">ログインしてください</p>
    </ModalError>
  {/if}
</div>
