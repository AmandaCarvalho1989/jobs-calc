<template>
  <div class="input-block">
    <label :for="name" :v-show="label.length">{{ label }}</label>
    <input :type="type || 'text'" :name="name" :placeholder="placeholder" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Input",
  props: {
    label: Object as () => string,
    name: Object as () => string,
    placeholder: Object as () => string,
    type: Object as () => string,
  },
});
</script>

<style lang="scss" scoped>
div.input-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  label {
    font-family: IBM Plex Sans;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 0.5rem;
  }

  input {
    height: 56px;
    width: 100%;
    background: #fcfdff;
    border: 1px solid #e1e3e6;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 16px 24px;
    font-family: IBM Plex Sans;
    font-size: 16px;
    line-height: 24px;

    ::placeholder {
      font-family: IBM Plex Sans;
      font-size: 16px;
      line-height: 24px;
      color: #bfbfcc;
    }
  }
}
</style>