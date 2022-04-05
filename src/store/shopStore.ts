import { writable } from 'svelte/store';
import type { FieldWithCreatedAt } from '../@types/index';
// NOTE:ナビゲーション遷移時、初回アクセス、リロード時にFirestoreの情報を入れる
// NOTE:全文検索した結果を上書きして入れる

const shopStore = writable<Array<FieldWithCreatedAt>>([]);

export { shopStore };
