<template>
  <div class="job-container">
    <Header label="Adicionar novo job" />
    <main>
      <form>
        <h1>Dados do Job</h1>
        <Input name="title" label="Nome do Job?" />
        <div class="input-group">
          <Input name="daysToWorkWeek" label="Estimativa de horas por dia" />
          <Input
            name="weeksForVacation"
            label="Estimativa de horas para esse job"
          />
        </div>
      </form>

      <section class="illustration">
        <img src="../assets/money-disabled.svg" alt="Money" />
        <p>Preencha os dados ao lado para ver o valor do projeto</p>
        <div class="action-buttons">
          <button class="save">Salvar</button>
          <button class="delete">
            <img src="../assets/delete.svg" alt="Delete" />
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import Input from "@/components/Input.vue";
export default Vue.extend({
  name: "Home",
  components: {
    Header,
    Input,
  },
  mounted(){
    console.log(this.$route)
  }
});
</script>

<style lang="scss" scoped>
div.job-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
main {
  padding-top: 64px;
  position: relative;
  width: 1120px;
  height: calc(100% - 72px);
  max-width: 1120px;
  display: flex;
  align-items: flex-start;
  gap: 5rem;

  form {
    width: 641px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    > h1 {
      width: 100%;
      font-family: IBM Plex Sans;
      font-weight: 600;
      font-size: 32px;
      line-height: 42px;
      border-bottom: 1.5px solid #e1e3e5;
      padding-bottom: 0.5rem;
      margin-bottom: 32px;
    }
  }
  section.illustration {
    width: 352px;
    min-width: 352px;
    height: 330px;
    background: #fcfdff;
    border: 1px solid #e1e3e6;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 40px 54px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    p {
      line-height: 26px;
    }

    div {
      width: 100%;
      display: flex;
      justify-content: space-between;

      button.save {
        width: 181px;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 12px 64px;
        background: #36b336;
      }
      button.delete {
        width: 48px;
        height: 48px;
        background: #e1e3e6;
        display: flex;
        align-items: center;
        padding: 12px;
      }
    }
  }
}
</style>