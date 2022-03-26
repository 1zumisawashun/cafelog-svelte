import {
  collectionPoint,
  documentPoint,
  subCollectionPoint,
  subDocumentPoint,
} from './firebaseConverter';
import type {
  Field,
  FieldWithoutIdWithCreatedAt,
  FieldWithoutId,
  Comment,
  Photo,
  SavedOrVisitedUser,
  SavedOrVisitedShop,
  User,
  FieldWithCreatedAt,
} from '../@types/index';
import { timestamp } from '../firebase/config';
import type { firebasePath } from '../@types/firebase';

class FirestoreUseCase {
  /**
   * コレクションへ追加
   * FIXME:リネームした方が良いかも
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
   * サブコレクションへ追加
   * FIXME:リネームした方が良いかも
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
   * サブドキュメントへ追加①
   */
  async addSubDocumentWithShopRef(
    doc: FieldWithCreatedAt,
    { collection, document, subCollection, subDocument }: firebasePath,
  ) {
    const shopQuery = await subDocumentPoint<
      FieldWithoutIdWithCreatedAt,
      SavedOrVisitedShop
    >(collection, document, subCollection, subDocument);
    try {
      shopQuery.set({
        documents: doc,
        reference: shopQuery,
      });
      // NOTE:reference型はcollectionには入れられない（addできない）模様？documentにsetで追加できた
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
  /**
   * サブドキュメントへ追加②
   */
  async addSubDocumentWithUserRef(
    doc: User,
    { collection, document, subCollection, subDocument }: firebasePath,
  ) {
    const shopQuery = await subDocumentPoint<User, SavedOrVisitedUser>(
      collection,
      document,
      subCollection,
      subDocument,
    );
    try {
      shopQuery.set({
        documents: doc,
        reference: shopQuery,
      });
      // NOTE:reference型はcollectionには入れられない（addできない）模様？documentにsetで追加できた
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
   * サブドキュメントを削除①
   */
  async deleteSubDocumentWithShopRef({
    collection,
    document,
    subCollection,
    subDocument,
  }: firebasePath) {
    const shopQuery = await subDocumentPoint<
      FieldWithoutIdWithCreatedAt,
      SavedOrVisitedShop
    >(collection, document, subCollection, subDocument);
    try {
      shopQuery.delete();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
  /**
   * サブドキュメントを削除②
   */
  async deleteSubDocumentWithUserRef({
    collection,
    document,
    subCollection,
    subDocument,
  }: firebasePath) {
    const shopQuery = await subDocumentPoint<User, SavedOrVisitedUser>(
      collection,
      document,
      subCollection,
      subDocument,
    );
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
