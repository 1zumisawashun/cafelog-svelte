import { timestamp } from '../firebase/config';
import CoffeeBreak from '../assets/image/coffeebreak.jpg';
import CoffeeCar from '../assets/image/coffeecar.jpg';
import CoffeeReserve from '../assets/image/coffeereserve.jpg';
import CoffeeDate from '../assets/image/date.jpg';
import FreeWifi from '../assets/image/freewifi.jpg';
import Studying from '../assets/image/studying.jpg';

export const mineType = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/bmp',
  'image/svg+xml',
];

export const searchContent = [
  {
    tag: 'alone',
    imagePath: CoffeeBreak,
    mainMessage: '一人で過ごしやすいカフェ',
    subMessage:
      '一人でカフェに入ることに抵抗がある人はいませんか？そんな方にもお勧めできる落ち着いたカフェを知っていただきたいです。',
  },
  {
    tag: 'date',
    imagePath: CoffeeDate,
    mainMessage: 'デートにお勧めしたいカフェ',
    subMessage:
      'デートに適したカフェを選ぶことによって恋人との関係をさらに深めることができます。いざというときにお洒落なお店を知っていると便利です。',
  },
  {
    tag: 'reserve',
    imagePath: CoffeeReserve,
    mainMessage: 'コーヒー通にお勧めしたいカフェ',
    subMessage:
      '普段コーヒーを飲んでいていつもと違うスペシャリティコーヒーを求めている方に是非ご覧いただいきたいカフェを特集いたしました。',
  },
  {
    tag: 'stand',
    imagePath: CoffeeCar,
    mainMessage: 'コーヒースタンド',
    subMessage:
      'お店で飲むコーヒー以外にもコーヒースタンドで飲むコーヒーも美味しいです。都会の散歩のお供にどこにあるのかお勧めします。',
  },
  {
    tag: 'wifi',
    imagePath: FreeWifi,
    mainMessage: 'Wi-Fiがある場所',
    subMessage:
      '勉強する為にはWi-Fiがないと始まりません。カフェに入ってからWi-Fiが無いというトラブルに陥らないように事前に確認しましょう。',
  },
  {
    tag: 'study',
    imagePath: Studying,
    mainMessage: '勉強しやすいカフェ',
    subMessage:
      'Wi-Fiはあるけど家族連れや雑音が激しいお店だと集中して勉強できません。ここではカフェで勉強しやすい環境を皆さんに共有したいと思います。',
  },
];

export const dammyShopData = {
  id: '',
  photoUrls: ['https://placehold.jp/200x200.png'],
  shopName: 'ダミーダミーダミーダミー',
  station: 'ダミーダミー',
  createdAt: timestamp.fromDate(new Date(2017, 0, 15, 22, 30)),
  comment: '',
  address: '',
  tel: '',
  tags: [],
  starRating: 0,
  businessHours: '',
  openOrClose: '',
  longitude: '',
  latitude: '',
  isSaved: false,
  isVisited: false,
  user: {
    displayName: '',
    photoURL: '',
    uid: '',
    email: '',
  },
};

export const dammyCommentData = {
  displayName: 'ダミーダミーダミーダミー',
  photoURL: 'https://placehold.jp/200x200.png',
  content: 'ダミーダミーダミーダミーダミーダミー',
  createdAt: timestamp.fromDate(new Date()),
  id: Math.random(),
};

export const dammyPhotoData = {
  displayName: 'ダミーダミーダミーダミー',
  photoURL: 'https://placehold.jp/200x200.png',
  photo: 'https://placehold.jp/200x200.png',
  createdAt: timestamp.fromDate(new Date()),
  id: Math.random(),
};
