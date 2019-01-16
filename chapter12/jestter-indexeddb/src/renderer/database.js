import { openDb } from 'idb'

const openDB = async () => {
  // 1 is a version tag
  return await openDb('jetsetter', 1, (upgradeDB) => {
    upgradeDB.createObjectStore('items', {
      keyPath: 'id',
      autoIncrement: true,
    })
  })
}

const database = openDB()

export default {
  add(item) {
    const tx = database.transaction('items', 'readwrite')
    tx.objectStore('items').add(item)
    return tx.complete
  },
  getAll() {
    return database
      .transaction('items')
      .objectStore('items')
      .getAll()
  },
  remove() {},
  removeAllUnpacked() {},
  unpackAll() {},
  update() {},
}
