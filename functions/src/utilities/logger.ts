import * as functions from 'firebase-functions';
import { firestore, timestamp } from '../firebase';

const logActivities = functions.firestore
  .document('/{collection}/{id}')
  .onCreate((snap, context) => {
    const collection = context.params.collection;
    const activities = firestore.collection('activities');
    if (collection === 'shops') {
      return activities.add({
        text: 'a new shop was added',
        date: timestamp,
      });
    }
    if (collection === 'users') {
      return activities.add({
        text: 'a new user signed up',
        date: timestamp,
      });
    }
    return null;
  });

// module.exports = logActivities;
export { logActivities };
