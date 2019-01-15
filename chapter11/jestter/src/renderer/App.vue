<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <!--
    <h1>Hello world!</h1>
    <button class="full-width">This button does not do anything.</button>
    -->
    <div class="Application">
      <items title="Unpacked Items" :items="unpacked" :on-check-off="markAsPacked"/>
      <items title="Packed Items" :items="packed" :on-check-off="markAsPacked"/>
      <button class="button full-width" @click="markAllAsUnpacked">Mark All As Unpacked</button>
    </div>
    <!--
    {{ JSON.stringify(packed,null,' ') }}
    <br>
    {{ JSON.stringify(unpacked,null,' ') }}
    -->
  </div>
</template>

<script>
import Items from "./components/Items";

export default {
  components: { Items },
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
      items: [{ value: "Pants", id: Date.now(), packed: false }]
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
    markAsPacked(id) {
      let i = this.items.findIndex(item => id === item.id);
      if (-1 === i) {
        return;
      }

      let updated = this.items[i];
      updated.packed = !updated.packed;
      this.items[i].splice(i, 1);
      this.items.unshift(updated);
    },
    markAllAsUnpacked() {
      let items = this.items.map(item => ({ ...item, packed: false }));
      this.items.splice(0);
      this.items = items;
    }
  }
};
</script>

<style>
/* CSS */
</style>
