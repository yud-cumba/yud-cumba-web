import firebase from './index';

// GET
export async function getAllData(collection) {
  const doc = await firebase
    .database()
    .ref(collection)
    .once('value');
  if (!doc.val()) return [];
  return Object.values(doc.val());
}

export async function getAll(collection) {
  const doc = await firebase
    .database()
    .ref(collection)
    .once('value');
  return doc.val();
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
