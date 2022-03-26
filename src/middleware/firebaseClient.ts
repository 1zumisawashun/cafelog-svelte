import {
  collectionPoint,
  documentPoint,
  subCollectionPoint,
} from './converter';
import type {
  Field,
  Photo,
  Comment,
  FieldWithCommentAndPhotoAndCreatedAt,
  FieldWithCreatedAt,
  FieldWithoutIdWithCreatedAt,
  // SavedOrVisitedShop,
  SavedOrVisitedUser,
  User,
} from '../@types/index';
import type { WhereFilterOp, firebasePath } from '../@types/firebase';
import type { firebase } from '../firebase/config';
import { convertedPath } from '../middleware/utilities';
class FirebaseUseCase {
  /**
   * 参照①
   * 全ての shop を取得する
   */
  async fetchAll(): Promise<Field[]> {
    const shopQuery = collectionPoint<Field>('shops');
    const shopSnapshot = await shopQuery.get();
    return await Promise.all(
      shopSnapshot.docs.map(async (doc) => {
        const shopItems: Field = {
          id: doc.id,
          ...doc.data(),
        };
        return shopItems;
      }),
    );
  }
  /**
   * 参照②
   * 条件に一致する shop を取得する
   */
  async fetchQueryAll(query: [string, WhereFilterOp, any]): Promise<Field[]> {
    let shopQuery = collectionPoint<Field>('shops');
    shopQuery = shopQuery.where(
      ...query,
    ) as firebase.firestore.CollectionReference<Field>;
    const shopSnapshot = await shopQuery.get();
    return await Promise.all(
      shopSnapshot.docs.map(async (doc) => {
        const shopItems: Field = {
          id: doc.id,
          ...doc.data(),
        };
        return shopItems;
      }),
    );
  }
  /**
   * 参照③
   * サブコレクションを含めた一つの shop を取得する
   */
  async fetchItem(
    id: string,
    uid: string,
  ): Promise<FieldWithCommentAndPhotoAndCreatedAt> {
    const shopQuery = documentPoint<FieldWithCreatedAt>('shops', id);
    const shopSnapshot = await shopQuery.get();

    const commentMap = await this.fetchSubAll<Comment>(
      convertedPath(`/shops/${id}/comment`),
    );
    const photoMap = await this.fetchSubAll<Photo>(
      convertedPath(`/shops/${id}/photo`),
    );
    const savedMap = await this.fetchSubAll<SavedOrVisitedUser>(
      convertedPath(`/shops/${id}/saved`),
    );
    const visitedMap = await this.fetchSubAll<SavedOrVisitedUser>(
      convertedPath(`/shops/${id}/visited`),
    );

    const savedResult = savedMap.map((el) => el.documents.uid === uid);
    const visitedResult = visitedMap.map((el) => el.documents.uid === uid);

    const shopItem: FieldWithCommentAndPhotoAndCreatedAt = {
      id: shopSnapshot.id,
      ...shopSnapshot.data(),
      isSaved: Boolean(savedResult.length), // NOTE:Partialしている
      isVisited: Boolean(visitedResult.length), // NOTE:Partialしている
      comments: commentMap,
      photos: photoMap,
    };
    console.log(shopItem, 'shopItem');
    return shopItem;
  }
  /**
   * 参照④
   * 該当する全てのサブコレクションを取得する
   */
  async fetchSubAll<T>({
    collection,
    document,
    subCollection,
  }: firebasePath): Promise<T[]> {
    const shopQuery = subCollectionPoint<FieldWithoutIdWithCreatedAt | User, T>(
      collection,
      document,
      subCollection,
    );
    const shopSnapshot = await shopQuery.get();
    return await Promise.all(
      shopSnapshot.docs.map(async (doc) => {
        const shopItems: T = {
          id: doc.id,
          ...doc.data(),
        };
        return shopItems;
      }),
    );
  }
}

export const firebaseUseCase = new FirebaseUseCase();
