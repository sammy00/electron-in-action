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
  add() {},
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
