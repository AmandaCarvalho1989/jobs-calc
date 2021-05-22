<template>
  <div class="project">
    <span>{{ project.id }}</span>
    <h3>{{ project.title }}</h3>
    <div class="info">
      <span> Prazo</span>
      <p>{{ project.deadline }} dias para entrega</p>
    </div>
    <div class="info">
      <span> Valor</span>
      <p>R$ {{ project.price }}</p>
    </div>

    <div v-if="project.status === 'DOING'" class="status doing">
      Em andamento
    </div>
    <div v-else class="status done">Encerrado</div>

    <div class="buttons">
      <button>
        <img src="../assets/edit.svg" alt="Edit" />
      </button>
      <button>
        <img src="../assets/delete.svg" alt="Delete" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export interface IProject {
  id: string;
  title: string;
  deadline: string;
  price: string;
  status: "DOING" | "DONE";
}

export default Vue.extend({
  name: "Project",
  props: {
    project: Object as () => IProject,
  },
});
</script>


<style lang="scss" scoped>
div.project {
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
  transition: border 0.5s;

  &:hover {
    border-left: 4px solid #f1972c;
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