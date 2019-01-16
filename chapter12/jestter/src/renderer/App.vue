<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <div class="container">
      <new-item :add-item="add"/>
      <items title="Unpacked Items" :items="unpacked" :on-check-off="pack"/>
      <items title="Packed Items" :items="packed" :on-check-off="pack"/>
      <div class="row center">
        <button class="btn pink small" @click="markAllAsUnpacked">Mark All As Unpacked</button>
      </div>
    </div>
  </div>
</template>

<script>
import database from "./database";

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
      //items: [{ value: "Pants", id: Date.now(), packed: false }]
      items: []
    };
  },
  computed: {
    packed() {
      return this.items.filter(item => item.packed);
    },
    unpacked() {
      return this.items.filter(item => !item.packed);
    }
  },
  methods: {
    async add(item) {
      await database("items").insert(item);
      this.fetch();
    },
    async fetch() {
      try {
        let items = await database("items").select();
        this.items = items;
      } catch (error) {
        console.error(error);
      }
    },
    async pack({ id, packed }) {
      try {
        await database("items")
          .where("id", id)
          .update({ packed: !packed });
        this.fetch();
      } catch (error) {
        console.error;
      }
    },
    markAllAsUnpacked() {
      let items = this.items.map(item => ({ ...item, packed: false }));
      this.items.splice(0);
      this.items = items;
    }
  },
  mounted() {
    this.fetch();
  }
};
</script>