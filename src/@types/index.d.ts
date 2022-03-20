export type Field = {
  shop_name: string;
  station: string;
  photos: Array<File>;
  comment: string;
  address: string;
  tel: string;
  tags: Array<string>;
  star_rating: number;
  business_hours: string;
  openOrClose: string;
  longitude: string; // 緯度
  latitude: string; // 経度
};
