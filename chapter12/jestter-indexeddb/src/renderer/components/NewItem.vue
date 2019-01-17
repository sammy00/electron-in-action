<template>
  <!--<form>-->
  <div class="row valign-wrapper">
    <div class="input-field col s8">
      <input placeholder="new item" type="text" v-model="value">
    </div>
    <div class="col s4">
      <button class="btn pink" @click="handleSubmit">Submit</button>
    </div>
  </div>
  <!--</form>-->
</template>

<script>
export default {
  props: ["addItem"],
  data() {
    return {
      value: ""
    };
  },
  methods: {
    handleSubmit() {
      let value = this.value;
      //this.addItem({ value, packed: false, id: Date.now() });
      this.addItem({ value, packed: false });
      //this.value = "";
    }
  }
};
</script>

