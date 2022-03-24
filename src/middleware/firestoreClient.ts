import {
  collectionPoint,
  documentPoint,
  subCollectionPoint,
} from './firebaseConverter';
import type {
  Field,
  FieldWithoutIdWithCreatedAt,
  FieldWithoutId,
  Comment,
  Photo,
} from '../@types/index';
import { timestamp } from '../firebase/config';

class FirestoreUseCase {
  /**
   * コレクションへ追加①
   */
  async addDocument(doc: FieldWithoutId) {
    const shopQuery = collectionPoint<FieldWithoutIdWithCreatedAt>('shops');
    try {
      const createdAt = timestamp.fromDate(new Date());
      shopQuery.add({ ...doc, createdAt });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
  /**
   * サブコレクションへ追加②
   */
  async addSubDocument(
    doc: Comment | Photo,
    id: string,
    subCollection: string,
  ) {
    const shopQuery = subCollectionPoint<
      FieldWithoutIdWithCreatedAt,
      Comment | Photo
    >('shops', id, subCollection);
    try {
      shopQuery.add({ ...doc });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
  /**
   * ドキュメントの削除
   */
  async deleteDocument(id: string) {
    let shopQuery = documentPoint<Field>('shops', id);
    try {
      shopQuery.delete();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
  /**
   * ドキュメントの更新
   */
  async updateDocument(id: string, doc: any) {
    let shopQuery = documentPoint<Field>('shops', id);
    try {
      shopQuery.update(doc);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
}

export const firestoreUseCase = new FirestoreUseCase();
