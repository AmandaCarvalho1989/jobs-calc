<template>
  <div id="app">
    <!-- <div id="nav">
       <router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { loadProfileData } from "./services/profile";
import Modal from "@/components/Modal.vue";

export default Vue.extend({
  data() {
    return {
      profile: {},
    };
  },
  async mounted() {
    this.profile = await loadProfileData()
  },
  provide() {
    return {
      profile: () => this.profile,
    };
  },
});

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  border: none;
  color: #fcfdff;
  outline: none;
  cursor: pointer;
  font-family: IBM Plex Sans;
  font-weight: bold;
  font-size: 14px;
  line-height: 26px;
  text-transform: uppercase;
  border-radius: 5px;

  &:disabled{
    cursor: not-allowed;
    opacity: 0.4;
  }
}

#app {
  font-family: Inter, sans-serif;
  color: #5a5a66;
  background-color: #f0f2f5;
  width: 100vw;
  height: 100vh;
}

div.input-group {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 32px;

  > div.input-block {
    width: 308px;
  }
}
</style>
