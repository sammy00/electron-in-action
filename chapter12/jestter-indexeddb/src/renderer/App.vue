<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <div class="container">
      <new-item :add-item="add"/>
      <items title="Unpacked Items" :items="unpacked" :on-check-off="pack" :on-delete="remove"/>
      <items title="Packed Items" :items="packed" :on-check-off="pack" :on-delete="remove"/>
      <div class="row">
        <button class="btn pink small" @click="unpackAll">Mark All As Unpacked</button>
      </div>
      <div class="row">
        <button class="btn grey small" @click="removeAllUnpacked">Remove All Unpacked</button>
      </div>
    </div>
  </div>
</template>

<script>
import db from "./database";

import Items from "./components/Items";
import NewItem from "./components/NewItem";

export default {
  components: { Items, NewItem },
  name: "jestter",
  metaInfo: {
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },
  data() {
    return {
      items: [] //[{ value: "Pants", id: Date.now(), packed: false }]
    };
  },
  computed: {
    packed() {
      //console.log("packed " + JSON.stringify(this.items, null, " "));
      return this.items.filter(item => item.packed);
    },
    unpacked() {
      //console.log("unpacked " + JSON.stringify(this.items, null, " "));
      return this.items.filter(item => !item.packed);
    }
  },
  methods: {
    add(item) {
      //console.log("add " + JSON.stringify(item));
      db.add(item);
      this.fetch();
    },
    async fetch() {
      this.items = await db.getAll();
      //console.log("fetch " + JSON.stringify(this.items, null, " "));
    },
    pack(item) {
      const updated = { ...item, packed: !item.packed };
      db.update(updated);
      this.fetch();
    },
    async remove(id) {
      await db.remove(id);
      this.fetch();
    },
    async removeAllUnpacked() {
      await db.removeAllUnpacked();
      this.fetch();
    },
    async unpackAll() {
      await db.unpackAll();
      this.fetch();
    }
  },
  async mounted() {
    await this.fetch();
  }
};
</script>