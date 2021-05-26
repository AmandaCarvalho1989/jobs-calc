<template>
  <div id="app">
    <router-view />
  </div>
</template>


<style lang="scss">
#app {
  font-family: Inter, sans-serif;
  color: #5a5a66;
  background-color: #f0f2f5;
  width: 100vw;
  height: 100%;

  @media (min-width: 1120px) {
    height: 100vh;
  }
}
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

div.input-group {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
    

  @media (min-width: 1120px) {
    flex-direction: row;
    margin-top: 32px;

    > div.input-block {
      width: 308px;
    }
  }
}
.flex {
  display: flex;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}


.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;

  border-radius: 2.5rem;
  padding: 0.5rem 1.5rem;

  font-weight: 500;
  font-size: 0.875rem; /* 14px of 16px root*/
  line-height: 1.625rem; /* 26px of 16px root*/

  background-color: rgb(237, 237, 237);
  
}

.progress .badge{
  background: #E8F8E8;
  color:#36B336;
}

.done .badge {
  background: #FAECEB;
  color:#EB3B35;
}
</style>
