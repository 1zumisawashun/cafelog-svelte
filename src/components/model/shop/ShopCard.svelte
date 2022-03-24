<script lang="ts">
export let shop: any;
import { Link, Router } from 'svelte-routing';
</script>

<Router>
  <div class="shop-card-container">
    <Link to="{`/shops/${shop.id}`}" class="link">
      <div class="image">
        <img src="{shop.photoUrls[0]}" alt="" />
      </div>
    </Link>
    <div class="content">
      <div class="name">{shop.shopName}</div>
      <div class="station-and-save">
        <div class="station">{shop.station}駅</div>
        <div class="save">
          <img src="assets/icon/icon_flag.svg" alt="" />
          <img src="assets/icon/icon_save.svg" alt="" />
          <span class="like"></span>
          <span class="visited"></span>
        </div>
      </div>
    </div>
  </div>
</Router>
