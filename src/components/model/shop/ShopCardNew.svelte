<script lang="ts">
export let shop: any;
import { Link, Router } from 'svelte-routing';
import SaveIcon from '../../../assets/icon/icon_save.svg';
import FlagIcon from '../../../assets/icon/icon_flag.svg';
</script>

<Router>
  <div class="shop-card-container">
    <Link to="{`/shops/${shop.id}`}" class="link">
      <div class="image ribbon-wrapper">
        <div class="ribbon-content">
          <span class="ribbon">NEW</span>
        </div>
        <img src="{shop.photoUrls[0]}" alt="" />
      </div>
    </Link>
    <div class="content">
      <div class="name">{shop.shopName}</div>
      <div class="station-and-save">
        <div class="station">{shop.station}駅</div>
        <div class="save">
          <img src="{FlagIcon}" alt="" />
          <img src="{SaveIcon}" alt="" />
          <span class="like"></span>
          <span class="visited"></span>
        </div>
      </div>
    </div>
  </div>
</Router>

<style>
.ribbon-wrapper {
  position: relative;
}
.ribbon-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 85px;
  height: 85px;
  overflow: hidden;
}

.ribbon {
  display: inline-block;
  position: absolute;
  padding: 5px 0;
  left: -24px;
  top: 20px;
  width: 160px;
  text-align: center;
  font-size: 18px;
  line-height: 16px;
  background: #ff3e00; /* $ultimate-orange */
  color: #fff;
  letter-spacing: 0.05em;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  border-top: dashed 1px rgba(255, 255, 255, 0.65);
  border-bottom: dashed 1px rgba(255, 255, 255, 0.65);
}
</style>
