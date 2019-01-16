<template>
  <article class="valign-wrapper">
    <label>
      <input type="checkbox" class="filled-in" :checked="packed" @change="onCheckOff({id, packed})">
      <span>{{ value }}</span>
    </label>
    &nbsp;
    <i class="hoverable red-text material-icons" @click="onDelete(id)">clear</i>
  </article>
</template>

<script>
export default {
  props: ["packed", "id", "value", "onCheckOff", "onDelete"]
};
</script>
