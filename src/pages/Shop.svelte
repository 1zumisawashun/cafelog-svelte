<script lang="ts">
export let id;
export let ready;
import ShopDetail from '../components/model/shop/ShopDetail.svelte';
</script>

<div class="common-container _pt-5 _pb-5">
  <p>Shop</p>
  <p>{id}</p>
  <ShopDetail ready="{ready}" />
</div>

<style lang="scss"></style>
