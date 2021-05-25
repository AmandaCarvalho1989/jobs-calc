<template>
  <div class="job-container">
    <Header label="Adicionar novo job" />
    <main>
      <form>
        <h1>Dados do Job</h1>

        <Input
          name="title"
          label="Nome do Job"
          v-model="title"
          :value="job ? job.title : title"
        />
        <div class="input-group">
          <Input
            name="dailyHours"
            label="Estimativa de horas por dia"
            type="number"
            v-model="dailyHours"
            :value="job.dailyHours || dailyHours"
          />
          <Input
            name="totalHours"
            label="Estimativa de horas para esse job"
            type="number"
            v-model="totalHours"
            :value="job ? job.totalHours : totalHours"
          />
        </div>

        <p>
          {{ job }}
        </p>
      </form>

      <section class="illustration">
        <img
          v-if="job && job.title && job.title.length"
          src="../assets/money-filled.svg"
          alt="Money"
        />
        <img v-else src="../assets/money-disabled.svg" alt="Money" />
        <p>Preencha os dados ao lado para ver o valor do projeto</p>
        <div class="action-buttons">
          <button class="save" @click="job ? updatedJob : createJob">
            Salvar
          </button>
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
import api from "@/services/api";

export default Vue.extend({
  name: "Home",
  components: {
    Header,
    Input,
  },

  data() {
    return {
      title: "",
      totalHours: 0,
      dailyHours: 0,
      job: {},
    };
  },
  mounted() {
    this.job = this.$route.params.job;
    console.log(this.$route.params.job);
  },
  methods: {
    async createJob() {
      const newJob = {
        title: this.title,
        dailyHours: Number(this.dailyHours),
        totalHours: Number(this.totalHours),
        createdAt: new Date(),
      };

      return await api.post("/jobs", { ...newJob });
    },

    async updateJob() {
      const id = this.job;
      const newJob = {
        title: this.title,
        dailyHours: Number(this.dailyHours),
        totalHours: Number(this.totalHours),
      };

      return await api.put(`/jobs/${id}`, { ...newJob });
    },
  },
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