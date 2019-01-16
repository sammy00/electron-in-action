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
  remove(id) {
    const tx = database.transaction('items', 'readwrite')
    tx.objectStore('items').delete(id)
    return tx.complete
  },
  removeAllUnpacked() {},
  unpackAll() {
    let items = this.getAll().map((item) => ({ ...item, packed: false }))

    const tx = database.transaction('items', 'readwrite')
    for (const item of items) {
      tx.objectStore('items').put(item)
    }

    return tx.complete
  },
  update(item) {
    const tx = database.transaction('items', 'readwrite')
    tx.objectStore('items').put(item)
    return tx.complete
  },
}
