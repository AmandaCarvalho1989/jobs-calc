<template>
  <div class="login-container">
    <main>
      <h1>Bem-vindo</h1>
      <div class="github-info">
        <img src="../assets/github.svg" alt="Git hub" />
        <p>Faça login com seu Github para começar</p>
      </div>
      <div class="input-block">
        <input
          type="text"
          v-model="username"
          placeholder="Insira seu username"
        />
        <button @click="handleSubmit">
          <img src="../assets/arrow-right.svg" alt="Arrow" />
        </button>
      </div>
      <span v-show="error"> Não encontrado</span>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Login",
  data() {
    return {
      username: "",
      error: false,
    };
  },
  methods: {
    async handleSubmit() {
      await fetch(`https://api.github.com/users/${this.username}`)
        .then((response) => {
          console.log("first: ", response);
          if (response.status === 200) return response.json();
          else this.error = true;
        })
        .then((response) => {
          console.log(response);

          const profile = {
            name: response.name,
            pictureLink: response["avatar_url"],
          };

          this.$root.$data.currentProfile = profile;
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.log({ error });
          this.error = error;
        });
    },
  },
});
</script>

<style lang='scss' scoped>
div.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #41414c;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #fcfdff;

  main {
    height: 400px;
    margin-left: 256px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    @media (max-width: 1120px) {
      margin: 0 auto;
      margin-left: auto;
    }

    div.github-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #bfbfcc;
      margin: 24px 0;
    }
    div.input-block {
      display: flex;
      align-items: center;
      height: 64px;
      width: 420px;
      color: #ffffff;

      @media (max-width: 600px) {
         width: 300px;
      }

      input {
        width: calc(100% - 64px);
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        padding: 4px 16px;
        background: linear-gradient(
          90deg,
          rgba(250, 156, 45, 0.1) 0.45%,
          rgba(252, 253, 255, 0.1) 31.4%
        );
        color: #fff;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 100%;
        border-radius: 0;
        background-color: #f1972c;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }

  span {
    margin-top: 1rem;
    color: #eb3b35;
  }
}
</style>