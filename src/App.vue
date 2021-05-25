<template>
  <div id="app">
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
  font-family: IBM Plex Sans;
  font-weight: bold;
  font-size: 14px;
  line-height: 26px;
  text-transform: uppercase;
  border-radius: 5px;

  &:disabled {
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
