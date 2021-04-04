import firebase from './index';

// GET
export async function getAllData(collection) {
  const doc = await firebase
    .database()
    .ref(collection)
    .once('value');
  console.log('doc', doc.val());
  if (!doc.val()) return [];
  return Object.values(doc.val());
}

export async function getDataByChild(collection, child) {
  const doc = await firebase
    .database()
    .ref(collection)
    .orderByChild(child.key)
    .equalTo(child.value)
    .once('value');
  if (!doc.val()) return [];
  return Object.values(doc.val());
}
