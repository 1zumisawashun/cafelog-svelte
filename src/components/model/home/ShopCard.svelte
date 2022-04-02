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
      <div class="image">
        <img src="{shop.photoUrls[0]}" alt="" />
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
