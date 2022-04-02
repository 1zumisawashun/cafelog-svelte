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
  isSaved?: boolean; // NOTE:追加
  isVisited?: boolean; // NOTE:追加
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

export type FieldWithoutId = Omit<Field, 'id'>;

export type FieldWithoutIdAndUser = Omit<Field, 'id' | 'user'>;

export type FieldWithoutIdWithCreatedAt = CreatedAt & FieldWithoutId;

export type FieldWithCreatedAt = CreatedAt & Field;

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

export type FieldWithCommentAndPhoto = {
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
  comments: Array<Comment>; // NOTE:追加
  photos: Array<Photo>; // NOTE:追加
  isSaved?: boolean; // NOTE:追加
  isVisited?: boolean; // NOTE:追加
};

export type FieldWithCommentAndPhotoAndCreatedAt = CreatedAt &
  FieldWithCommentAndPhoto;

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
