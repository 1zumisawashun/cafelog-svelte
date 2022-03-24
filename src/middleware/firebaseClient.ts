import {
  collectionPoint,
  documentPoint,
  subCollectionPoint,
} from './firebaseConverter';
import type {
  Field,
  Photo,
  Comment,
  FieldWithCommentAndPhoto,
} from '../@types/index';
import type { WhereFilterOp } from '../@types/firebase';
import type { firebase } from '../firebase/config';
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
   * comment photo を含めた一つの shop を取得する
   */
  async fetchItem(id: string): Promise<FieldWithCommentAndPhoto> {
    const shopQuery = documentPoint<Field>('shops', id);
    const shopSnapshot = await shopQuery.get();
    const commentMap = await this.fetchSubAll<Comment>(id, 'comment');
    const photoMap = await this.fetchSubAll<Photo>(id, 'photo');

    const shopItem: FieldWithCommentAndPhoto = {
      id: shopSnapshot.id,
      ...shopSnapshot.data(),
      comments: commentMap,
      photos: photoMap,
    };
    console.log(shopItem, 'shopItem');
    return shopItem;
  }
  /**
   * 参照④
   * 全ての comment もしくは photo を取得する
   */
  async fetchSubAll<T>(id: string, subCollection: string): Promise<T[]> {
    const shopQuery = subCollectionPoint<Field, T>('shops', id, subCollection);
    const shopSnapshot = await shopQuery.get();
    return await Promise.all(
      shopSnapshot.docs.map(async (doc) => {
        const shopItems: T = {
          ...doc.data(),
        };
        return shopItems;
      }),
    );
  }
}

export const firebaseUseCase = new FirebaseUseCase();
