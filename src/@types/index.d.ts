import type { firebase } from '../firebase/config';

export type Field = {
  id: string;
  shopName: string;
  station: string;
  photoUrls: Array<string>;
  comment: string;
  address: string;
  tel: string;
  tags: Array<string>;
  starRating: number;
  businessHours: string;
  openOrClose: string;
  user: User;
  isSaved?: boolean; // NOTE:初期登録時にはポストされない＞初期値としてプロパティ追加した方が良いかも
  isVisited?: boolean; // NOTE:初期登録時にはポストされない＞初期値としてプロパティ追加した方が良いかも
  objectID?: string; // NOTE:Algoliaで追加される余分なプロパティ
  lastmodified?: number; // NOTE:Algoliaで追加される余分なプロパティ
  path?: string; // NOTE:Algoliaで追加される余分なプロパティ
};

export type User = {
  displayName: firebase.UserInfo.displayName;
  photoURL: firebase.UserInfo.photoURL;
  uid: string;
  email: string;
};

export type CreatedAt = {
  createdAt: firebase.firestore.Timestamp;
};

// NOTE:Algoliaで取得できるcreatedAtはnumberのため作成
export type CreatedAtNumber = {
  createdAt: number;
};

export type FieldWithoutId = Omit<Field, 'id'>;

export type FieldWithoutIdAndUser = Omit<Field, 'id' | 'user'>;

export type FieldWithoutIdWithCreatedAt = CreatedAt & FieldWithoutId;

// NOTE:Algoliaで取得できるcreatedAtはnumberのため作成
export type FieldWithoutIdWithCreatedAtNumber = CreatedAtNumber &
  FieldWithoutId;

export type FieldWithCreatedAt = CreatedAt & Field;

export type FieldWithCommentAndPhotoAndCreatedAt = Field &
  CommentAndPhotoAndCreatedAt;

export type Comment = {
  displayName: firebase.UserInfo.displayName;
  photoURL: firebase.UserInfo.photoURL;
  content: string;
  createdAt: firebase.firestore.Timestamp;
  id: number; // NOTE:ランダムで生成したID
};

export type Photo = {
  displayName: firebase.UserInfo.displayName;
  photoURL: firebase.UserInfo.photoURL;
  photo: string;
  createdAt: firebase.firestore.Timestamp;
  id: number; // NOTE:ランダムで生成したID
};

export type CommentAndPhotoAndCreatedAt = {
  createdAt: firebase.firestore.Timestamp;
  comments: Array<Comment>;
  photos: Array<Photo>;
};

export type SavedOrVisitedUser = {
  documents: User;
  reference: firebase.firestore.DocumentReference<SavedOrVisitedUser>;
};
export type SavedOrVisitedShop = {
  documents: FieldWithCreatedAt;
  reference: firebase.firestore.DocumentReference<SavedOrVisited>;
};

export type FetchSavedAndVisitedAll = {
  savedResult: Array<SavedOrVisitedUser>;
  visitedResult: Array<SavedOrVisitedUser>;
};
