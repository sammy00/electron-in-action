<template>
  <section class="Items">
    <h2>{{ title }}</h2>
    <item
      v-for="i in items"
      :id="i.id"
      :key="i.id"
      :on-check-off="onCheckOff"
      :packed="i.packed"
      :value="i.value"
    ></item>
  </section>
</template>

<script>
import Item from "./Item";

export default {
  props: ["title", "items", "onCheckOff"],
  components: { Item }
};
</script>

