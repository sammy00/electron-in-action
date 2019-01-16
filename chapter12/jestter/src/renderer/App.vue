<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <div class="container">
      <new-item :add-item="add"/>
      <items title="Unpacked Items" :items="unpacked" :on-check-off="markAsPacked"/>
      <items title="Packed Items" :items="packed" :on-check-off="markAsPacked"/>
      <div class="row center">
        <button class="btn pink small" @click="markAllAsUnpacked">Mark All As Unpacked</button>
      </div>
    </div>
  </div>
</template>

<script>
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
    add(item) {
      this.items.push(item);
      //console.log(JSON.stringify(item, null, " "));
    },
    markAsPacked(id) {
      console.log("hello " + id);
      let i = this.items.findIndex(item => id === item.id);
      if (i === -1) {
        return;
      }

      let updated = this.items[i];
      updated.packed = !updated.packed;
      this.items.splice(i, 1);
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