import idb from 'idb'

const database = idb.open('jetsetter', 1, (upgradeDB) => {
  upgradeDB.createObjectStore('items', {
    keyPath: 'id',
    autoIncrement: true,
  })
})
