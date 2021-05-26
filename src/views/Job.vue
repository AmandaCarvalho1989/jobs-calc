<template>
  <div class="job-container">
    <Header :label="`${job.id ? 'Editar job' : 'Adicionar novo job'}`" />
    <main>
      <form>
        <h1>Dados do Job</h1>

        <Input
          name="title"
          label="Nome do Job"
          v-model="job.title"
          :value="job.title"
        />
        <div class="input-group">
          <Input
            name="dailyHours"
            label="Estimativa de horas por dia"
            type="number"
            v-model="job.dailyHours"
            :value="job.dailyHours"
          />
          <Input
            name="totalHours"
            label="Estimativa de horas para esse job"
            type="number"
            v-model="job.totalHours"
            :value="job.totalHours"
          />
        </div>
      </form>

      <section class="illustration">
        <img v-if="job.id" src="../assets/money-filled.svg" alt="Money" />
        <img v-else src="../assets/money-disabled.svg" alt="Money" />

        <p v-if="!job.id">
          Preencha os dados ao lado para ver o valor do projeto
        </p>
        <span v-else>
          <p>O valor do projeto ficou em</p>
          <strong> R$ {{ job.budget }} reais</strong>
        </span>
        <div class="action-buttons">
          <button class="save" @click="handleSaveJob">
            {{ job.id ? "Atualizar" : "Salvar" }}
          </button>

          <button
            class="delete"
            :disabled="!job.id"
            @click="setModalOpened(true)"
          >
            <img src="../assets/delete.svg" alt="Delete" />
          </button>
        </div>
      </section>

      <Modal
        :open="isModalOpened"
        :job="job"
        @onClose="setModalOpened(false)"
      />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import Input from "@/components/Input.vue";
import Modal from "@/components/Modal.vue";
import { createJob, updateJob } from "@/services/job";

export default Vue.extend({
  name: "Home",
  components: {
    Header,
    Input,
    Modal,
  },

  data() {
    return {
      job: this.$route.params.job || {
        id: undefined,
        title: "",
        dailyHours: 0,
        totalHours: 0,
      },
      isModalOpened: false,
      hasBudget: false,
    };
  },

  methods: {
    handleSaveJob() {
      if (typeof this.job === "object") {
        if (this.job.id) updateJob(this.job);
        else createJob(this.job);
        this.$router.push("/dashboard");
      }
    },
    setModalOpened(opened: boolean) {
      this.isModalOpened = opened;
    },
  },
});
</script>

<style lang="scss" scoped>
@media (min-width: 1120px) {
  div.job-container {
    overflow: hidden;
  }
  section.illustration {
    width: 352px;
    min-width: 352px;
    height: 100%;
    > div {
      justify-content: space-between;
      margin-top: 0rem;
    }
  }
}
div.job-container {
  position: relative;
  width: 100%;
  height: 100%;

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

  @media (max-width: 900px) {
    padding-inline: 32px;
    max-width: 100%;
    flex-direction: column;
    gap: 2rem;
  }

  form {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

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
    width: 100%;

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
      justify-content: space-evenly;
      margin-top: 1rem;

      button.save {
        width: 181px;
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 12px 64px;
        background: #36b336;
        /* margin-right: 1rem; */
      }
      button.delete {
        width: 50px;
        height: 50px;
        background: #e1e3e6;
        display: flex;
        align-items: center;
        padding: 12px;
      }
    }
  }
}
</style>