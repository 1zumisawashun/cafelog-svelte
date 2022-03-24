import { collectionPoint } from './firebaseConverter';
import type { Field } from '../@types/index';
class ShopUseCase {
  /**
   * 参照①
   */
  async fetchAll(): Promise<Field[]> {
    const productQuery = collectionPoint<Field>('shops');
    const shopSnapshot = await productQuery.get();
    return await Promise.all(
      shopSnapshot.docs.map(async (doc) => {
        const shopItem: Field = {
          // id: doc.id, // FIXME:型定義を追加する
          ...doc.data(),
        };
        return shopItem;
      }),
    );
  }
}

export const shopUseCase = new ShopUseCase();
