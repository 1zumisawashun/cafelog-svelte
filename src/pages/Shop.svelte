<script lang="ts">
export let id;
export let ready;
import ShopDetail from '../components/model/shop/ShopDetail.svelte';
import { onMount } from 'svelte';
import Loading from '../components/ui/Loading.svelte';
import { firebaseUseCase } from '../middleware/firebaseClient';
import type { FieldWithCommentAndPhoto } from '../@types/index';
import { dammyCommentData, dammyPhotoData } from '../middleware/constants';
import { initFirebaseAuth } from '../middleware/auth';
let shop: FieldWithCommentAndPhoto;

onMount(async () => {
  const user = await initFirebaseAuth();
  shop = await firebaseUseCase.fetchItem(id, user.uid);
  if (shop.comments.length < 3) {
    const result = [...Array(3 - shop.comments.length)].map(
      () => dammyCommentData,
    );
    shop.comments = [...shop.comments, ...result];
  }
  if (shop.photos.length < 6) {
    const result = [...Array(6 - shop.photos.length)].map(() => dammyPhotoData);
    shop.photos = [...shop.photos, ...result];
  }
});
</script>

<div class="common-container _pt-5 _pb-5">
  {#if !shop}
    <Loading />
  {:else}
    <!-- このタイミングでコメントと写真を送る -->
    <ShopDetail ready="{ready}" shop="{shop}" />
  {/if}
</div>

<style lang="scss"></style>
