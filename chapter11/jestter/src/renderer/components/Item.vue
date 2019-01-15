<template>
  <article class="Item">
    <label>
      <input type="checkbox" checked="packed" @change="onCheckOff">
      {{ value }}
    </label>
  </article>
</template>

<script>
export default {
  props: ["packed", "id", "value", "onCheckOff"]
};
</script>
