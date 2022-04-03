// NOTE:タイプガードのために作成
if (!process.env.ALGOLIA_APP_ID)
  throw new Error("we can't find your ALGOLIA_APP_ID");
if (!process.env.ALGOLIA_SEARCH_ONLY_API_KEY)
  throw new Error("we can't find your ALGOLIA_SEARCH_ONLY_API_KEY");
if (!process.env.ALGOLIA_ADMIN_API_KEY)
  throw new Error("we can't find your ALGOLIA_ADMIN_API_KEY");

export const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
export const ALGOLIA_SEARCH_ONLY_API_KEY =
  process.env.ALGOLIA_SEARCH_ONLY_API_KEY;
export const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
