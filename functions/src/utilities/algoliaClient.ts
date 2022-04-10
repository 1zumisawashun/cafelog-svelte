import algoliasearch from 'algoliasearch';
const client = algoliasearch('9WGEGCBZDB', 'd1d59e53f0bc4ee9c293145a7673f266');
const index = client.initIndex('cafelog');
import * as functions from 'firebase-functions';

const deleteAlgolia = functions.firestore
  .document('/shops/{id}')
  .onDelete(async (snapshot, context) => {
    // do anything
    index.deleteObject(context.params.id);
    functions.logger.info('Hello logs!', { structuredData: true });
    console.log(`shop ${context.params.id} deleted.`);
  });

export { deleteAlgolia };
