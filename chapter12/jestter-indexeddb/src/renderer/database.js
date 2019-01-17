import Dexie from 'dexie'

//import hello from './hello'

const db = new Dexie('jetsetter')
db.version(1).stores({
  items: `++id`,
})

export default {
  async add(item) {
    await db.open()
    await db.items.add(item)
  },
  async getAll() {
    await db.open()
    //console.log('---' + JSON.stringify(await db.items.toArray(), null, ' '))
    return db.items.toArray()
  },
  async remove(id) {
    await db.open()
    await db.items
      .where('id')
      .equals(id)
      .delete()
  },
  async removeAllUnpacked() {
    try {
      await db.open()
      return db.items.filter((item) => !item.packed).delete()
    } catch (error) {
      console.error(error)
    }
  },
  async update(item) {
    await db.open()
    await db.items.update(item.id, item)
  },
  async unpackAll() {
    try {
      //await db.open()
      let old = (await this.getAll()).map((item) => item.id)

      await db.transaction('rw', db.items, async () => {
        for (let i of old) {
          await db.items.update(i, { packed: false })
        }
      })
    } catch (error) {
      console.error(error)
    }
  },
}
