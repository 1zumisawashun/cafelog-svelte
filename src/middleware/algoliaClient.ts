import { ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY } from './env';
import algoliasearch from 'algoliasearch';
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex('cafelog');

const querySearch = async (query: string) => {
  const hits = await index.search(query);
  return hits;
};

export { querySearch };
