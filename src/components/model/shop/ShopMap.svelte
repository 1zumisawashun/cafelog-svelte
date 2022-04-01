<script lang="ts">
import { onMount } from 'svelte';

export let address: string;
let container;

const initMap = (shopAddress) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    {
      address: shopAddress,
      region: 'jp',
    },
    function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        // 取得した座標をセット緯度経度をセット
        const map_location = new google.maps.LatLng(
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng(),
        );
        const map_options = {
          zoom: 13,
          center: map_location,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        const map = new google.maps.Map(container, map_options);

        new google.maps.Marker({
          position: map_location,
          map: map,
        });
      }
    },
  );
};
onMount(async () => {
  await initMap(address);
});
</script>

<div class="full-screen _mt-5" bind:this="{container}"></div>

<style>
.full-screen {
  /* width: 100vw; */
  height: 300px;
}
</style>
