<template>
  <section class="row">
    <h5>{{ title }}</h5>
    <item
      v-for="i in items"
      :id="i.id"
      :key="i.id"
      :on-check-off="onCheckOff"
      :on-delete="onDelete"
      :packed="i.packed"
      :value="i.value"
    ></item>
  </section>
</template>

<script>
import Item from "./Item";

export default {
  props: ["title", "items", "onCheckOff", "onDelete"],
  components: { Item }
};
</script>

