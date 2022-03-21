import { writable } from 'svelte/store';

const shopStore = writable([
  {
    shopName: '熱々のコーヒー',
    photoUrls: [
      'https://firebasestorage.googleapis.com/v0/b/cafelog-e250c.appspot.com/o/photos%2FW2L5OAelrWYZuKtYxR1Ilc02vb43%2Fcoffeestand.jpg?alt=media&token=7ddcf8f2-2b34-4a29-bea6-37755d2f13cd',
    ],
    station: '渋谷駅',
    id: Math.random(),
  },
  {
    shopName: '酸っぱいコーヒー',
    photoUrls: [
      'https://firebasestorage.googleapis.com/v0/b/cafelog-e250c.appspot.com/o/photos%2FW2L5OAelrWYZuKtYxR1Ilc02vb43%2Farian-darvishi-wh-RPfR_3_M-unsplash.jpg?alt=media&token=fc8fd54c-8dec-4d50-9f86-b5a96a8893de',
    ],
    station: '表参道駅',
    id: Math.random(),
  },
  {
    shopName: 'かなり苦いコーヒー',
    photoUrls: [
      'https://firebasestorage.googleapis.com/v0/b/cafelog-e250c.appspot.com/o/photos%2FW2L5OAelrWYZuKtYxR1Ilc02vb43%2Fcoffeecar.jpg?alt=media&token=6fb77272-95b9-4821-b9a1-93762811aa63',
    ],
    station: '中目黒駅',
    id: Math.random(),
  },
  {
    shopName: 'キンキンに冷えたコーヒー',
    photoUrls: [
      'https://firebasestorage.googleapis.com/v0/b/cafelog-e250c.appspot.com/o/photos%2FW2L5OAelrWYZuKtYxR1Ilc02vb43%2Fannie-spratt-qyAka7W5uMY-unsplash.jpg?alt=media&token=6ffd7e9e-4bef-4149-8d5e-9ded143217c6',
    ],
    station: '新橋駅',
    id: Math.random(),
  },
]);

export { shopStore };
