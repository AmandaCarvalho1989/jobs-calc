<template>
  <header>
    <nav>
      <img src="../assets/arrow-left.svg" alt="Back" @click="$router.go(-1)" />
      <p>{{ label }}</p>
    </nav>
  </header>
</template>
<script lang="ts">
import api from "@/services/api";
import Vue from "vue";
export default Vue.extend({
  name: "Header",
  props: {
    label: String,
  },
});
</script>

<style lang="scss" scoped>
header {
  position: relative;
  width: 100%;
  height: 72px;
  background-color: #41414c;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 99;

   @media (max-width: 1400px) {
    padding-inline: 32px;
  }

  > nav {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 1120px;
    border-bottom: 1.5px solid #4f4f5b;
    font-weight: 600;
    color: #bfbfcc;

    > img {
      left: 0;
      position: absolute;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
</style>