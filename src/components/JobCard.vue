<template>
  <div :class="`card ${job.status}`" :data-id="job.id">
    <div class="id column">{{ job.id }}</div>
    <div class="name column">{{ job.title }}</div>
    <div class="deadline column">
      <span>Prazo</span>
      <p>
        {{
          job.status === "progress"
            ? `${job.remaining} dias para a entrega`
            : "Prazo encerrado"
        }}
      </p>
    </div>
    <div class="amount column">
      <span>Valor</span>
      <p>R$ {{ job.budget }}</p>
      <!-- <p>R$ {{ job.budget.toFixed(2).replace('.', ',') %></p> -->
    </div>
    <div class="status badge column">
      {{ job.status === "done" ? "Encerrado" : "Em andamento" }}
    </div>
    <div class="actions column flex">
      <p class="sr-only">Ações</p>
      <button
      class="edit-btn"
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
import { calculateBudget } from "@/utils";
import { loadProfileData } from "@/services/profile";
import { IJob } from "@/models/job";

export default Vue.extend({
  name: "JobCard",
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
<style lang='scss' scoped>
.card {
  display: grid;
  grid-template-columns: 5% 35% 20% 15% 15% 10%;
  align-items: center;
  margin-bottom: 0.5rem;
  position: relative;
  transition: all 0.2s;
  background: #fcfdff;
  border-radius: 0.313rem;
  border: 1px solid #e1e3e6;
  color: #5a5a66;
  padding: 1.5rem;
  text-align: left;
}

.card:hover {
  background: linear-gradient(
      90deg,
      rgba(250, 156, 45, 0.1) 0.45%,
      rgba(252, 253, 255, 0.1) 31.4%
    ),
    white;
}

.card::before {
  content: " ";

  width: 0.25rem;
  height: 0%;
  background-color: #f1972c;

  border-radius: 0.313rem 0 0 0.313rem;

  position: absolute;
  top: 0;
  left: -1px;

  transition: all 0.2s;
}

.card:hover::before {
  height: 100%;
}

.card .column:last-child {
  justify-self: flex-end;
}

.card .column > span {
  display: block;

  font-family: Inter;
  font-weight: 600;
  font-size: 0.75rem; /* 12px of 16px root*/
  text-transform: uppercase;

  color: #bfbfcc;
}

.progress .column p {
  font-weight: 600;
}

.column.id {
  font-family: IBM Plex Sans;
  font-weight: 600;
  color: #bfbfcc;
}

.column.name {
  font-family: IBM Plex Sans;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.125rem;
}

.column.actions {
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

    &.edit-btn{
      margin-right: 8px;
    }

    &:hover {
      background-color: #f0f2f5;
      transition: 0.3s;
    }
  }
}

@media (max-width: 1390px) {
  .card {
    grid-template-columns: 5% 30% 20% 15% 17.25% 12.25%;
  }
}

@media (max-width: 970px) {
  .card {
    grid-template-columns: 31% 23% 13% 20.25% 12.25%;
  }

  .column.id {
    display: none;
  }
}

@media (max-width: 770px) {
  .card {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "lt rt"
      "lm rm"
      "lb rb";
    gap: 0.5rem;
  }

  .column.id {
    display: none;
  }

  .column.name {
    grid-area: lt;
  }
  .column.deadline {
    grid-area: lm;
  }
  .column.amount {
    grid-area: lb;
  }
  .column.status {
    justify-self: end;
    grid-area: rt;
  }
  .column.actions {
    grid-area: rb;
  }
}
</style>