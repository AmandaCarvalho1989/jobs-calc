<template>
  <header>
    <nav>
    
      <img src="../assets/arrow-left.svg" alt="Back"  @click="$router.go(-1)"/>
      <p>{{ label }}</p>
    </nav>
  </header>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Header",
  props: {
    label: Object as () => string,
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
    color: #BFBFCC;

    > img{
      left: 0;
      position: absolute;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
}
</style>