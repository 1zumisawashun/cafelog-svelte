import { ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY } from './env';
import algoliasearch from 'algoliasearch';
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex('cafelog');
import type { FieldWithoutIdWithCreatedAtNumber } from '../@types/index';
import type { SearchResponse } from '@algolia/client-search';

const querySearch = async (query: string) => {
  const hits: SearchResponse<FieldWithoutIdWithCreatedAtNumber> =
    await index.search<FieldWithoutIdWithCreatedAtNumber>(query);
  return hits;
};

export { querySearch };
