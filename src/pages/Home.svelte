<script lang="ts">
import { onMount } from 'svelte';
import { projectFirestore } from '../firebase/config';
import ShopList from '../components/model/shop/ShopList.svelte';
let shops: Array<any> = [];

onMount(async () => {
  const ref = await projectFirestore.collection('shops');
  const snapshot = await ref.get();
  shops = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  console.log(shops, 'shop');
});
</script>

<div class="common-container">
  <ShopList shops="{shops}" />
</div>
