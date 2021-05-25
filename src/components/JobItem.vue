<template>
  <div class="project">
    <span>{{ job.idx + 1 }}</span>
    <h3>{{ job.title }}</h3>
    <div class="info">
      <span> Prazo</span>
      <p>{{ job.remaining }} dias para entrega</p>
    </div>
    <div class="info">
      <span> Valor</span>
      <p>R$ {{ calculateBudget(this.job, this.valueHour) }}</p>
    </div>

    <div v-if="job.status === 'progress'" class="status doing">
      Em andamento
    </div>
    <div v-else class="status done">Encerrado</div>
    <div class="buttons">
      <button
        @click="
          $router.push({
            name: 'Job',
            params: { id: job.id, job },
          })
        "
      >
        <img src="../assets/edit.svg" alt="Edit" />
      </button>
      <button>
        <img src="../assets/delete.svg" alt="Delete" @click="handleDelete" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import api from "@/services/api";
import { calculateBudget } from "@/utils";
import { loadProfileData } from "@/services/profile";
import { deleteJob } from "@/services/job";
export interface IJob {
  remaining: number;
  status: string;
  budget: number;
  id: string;
  title: string;
  totalHours: number;
  dailyHours: number;
}

export default Vue.extend({
  name: "JobItem",
  props: {
    job: Object as () => IJob,
  },
  data() {
    return {
      valueHour: 0,
    };
  },
  methods: {
    handleDelete() {
      this.$emit("delete", this.job.id);
    },
    calculateBudget,
  },
  async mounted() {
    await loadProfileData().then((response) => {
      this.valueHour = response.valueHour;
    });
  },
});
</script>

<style lang="scss" scoped>
div.project {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 96px;
  background: #fcfdff;
  border: 1px solid #e1e3e6;
  box-sizing: border-box;
  border-radius: 5px;
  color: #5a5a66;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  transition: border background-color 0.5s;

  &:hover {
    border-left: 4px solid #f1972c;
    /* background: linear-gradient(
      90deg,
      rgba(250, 156, 45, 0.1) 0.45%,
      rgba(252, 253, 255, 0.1) 31.4%
    ); */
    transition: border 0.5s;
  }

  span {
    font-family: IBM Plex Sans, sans-serif;
    color: #bfbfcc;
    font-weight: 600;
    /* margin-right: 32px; */
  }
  h3 {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 24px;
    width: 238px;
  }

  > div.info {
    span {
      font-weight: 600;
      font-size: 12px;
      line-height: 22px;
      text-transform: uppercase;
      color: #bfbfcc;
    }

    &:first {
      /* margin-right: 64px; */
    }
  }

  div.status {
    height: 40px;
    padding: 7px 24px;
    border-radius: 40px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 600;
    &.doing {
      color: #36b336;
      background: #e8f8e8;
    }
    &.done {
      color: #eb3b35;
      background: #faeceb;
    }
  }

  div.buttons {
    display: flex;
    button {
      width: 40px;
      height: 40px;
      background: #fcfdff;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e1e3e6;
      box-sizing: border-box;
      border-radius: 5px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
      transition: background-color 0.3s;

      &:first-child {
        margin-right: 8px;
      }

      &:hover {
        background-color: #f0f2f5;
        transition: 0.3s;
      }
    }
  }
}
</style>