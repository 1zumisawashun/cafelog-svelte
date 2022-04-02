<script lang="ts">
import { onMount } from 'svelte';

export let address: string;
let container: any;
let container2: any;

const initMap = (shopAddress: string) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode(
    {
      address: shopAddress,
      region: 'jp',
    },
    function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        // 取得した座標をセット緯度経度をセット
        if (!results) return;
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
const successFunc = (position: any) => {
  var data = position.coords;
  console.log(data);
  // 必要な緯度経度だけ取得
  var lat = data.latitude;
  var lng = data.longitude;
  // 取得した座標をセット緯度経度をセット
  const map_location = new google.maps.LatLng(lat, lng);
  const map_options = {
    zoom: 13,
    center: map_location,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  const map = new google.maps.Map(container2, map_options);

  new google.maps.Marker({
    position: map_location,
    map: map,
  });
};
const errorFunc = (error: any) => {
  const index: 0 | 1 | 2 | 3 = error.code;
  var errorMessage = {
    0: '原因不明のエラーが発生しました。',
    1: '位置情報が許可されませんでした。',
    2: '位置情報が取得できませんでした。',
    3: 'タイムアウトしました。',
  };
  alert(errorMessage[index]);
};

onMount(async () => {
  await initMap(address);
  if (navigator.geolocation) {
    await navigator.geolocation.getCurrentPosition(successFunc, errorFunc, {
      enableHighAccuracy: false,
      timeout: 100,
      maximumAge: 100,
    });
  } else {
    alert('あなたの端末では、現在位置を取得できません。');
  }
});
</script>

<div class="full-screen _mt-5" bind:this="{container}"></div>
<div class="full-screen _mt-5" bind:this="{container2}"></div>

<style>
.full-screen {
  /* width: 100vw; */
  height: 300px;
}
</style>
