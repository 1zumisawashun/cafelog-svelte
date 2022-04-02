<script lang="ts">
export let shop: FieldWithCreatedAt;
import { Link, Router } from 'svelte-routing';
import SaveOnIcon from '../../../assets/icon/icon_save_on.svg';
import FlagOnIcon from '../../../assets/icon/icon_flag_on.svg';
import SaveOffIcon from '../../../assets/icon/icon_save_off.svg';
import FlagOffIcon from '../../../assets/icon/icon_flag_off.svg';
import type { FieldWithCreatedAt } from '../../../@types/index';
</script>

<Router>
  <div class="shop-card-container">
    <Link to="{`/shops/${shop.id}`}" class="link">
      <div class="hide-thumbnail">
        <img src="{shop.photoUrls[0]}" alt="" />
        <span class="text">Close</span>
      </div>
    </Link>
    <div class="content">
      <div class="name">{shop.shopName}</div>
      <div class="station-and-save">
        <div class="station">{shop.station}駅</div>
        <div class="save">
          {#if shop.isVisited}
            <img src="{FlagOnIcon}" alt="" />
          {:else}
            <img src="{FlagOffIcon}" alt="" />
          {/if}
          {#if shop.isSaved}
            <img src="{SaveOnIcon}" alt="" />
          {:else}
            <img src="{SaveOffIcon}" alt="" />
          {/if}
        </div>
      </div>
    </div>
  </div>
</Router>

<style>
.hide-thumbnail {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 150px;
  border-radius: 10px 10px 0 0;
}
.hide-thumbnail img {
  display: block;
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.hide-thumbnail::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 150px;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0.8;
  border-radius: 10px 10px 0 0;
}
.hide-thumbnail .text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  padding: 6px 12px 8px;
  color: #fff;
  font-size: 14px;
  border: 1px solid #fff;
}
</style>
