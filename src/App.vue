<template>
  <div id="app">
    <!-- <div id="nav">
       <router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view />
  </div>
</template>

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
}

#app {
  font-family: Inter, sans-serif;
  color: #fcfdff;
  background-color: #f0f2f5;
  width: 100vw;
  height: 100vh;
}
</style>
