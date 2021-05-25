<template>
  <div class="home">
    <div class="top-panel">
      <header>
        <div id="header-content">
          <img src="../assets/logo.png" alt="Jobs Calc Logo" />
          <div class="alert-info">
            <img src="../assets/alert-octagon.svg" alt="alert" />
            <p>Você tem {{ freeHours }} horas livres no seu dia</p>
          </div>
          <div class="profile">
            <div class="description">
              <h3>{{ profile.name }}</h3>
              <router-link to="/profile"> Ver perfil</router-link>
              <!-- <p>Ver perfil</p> -->
            </div>
            <img :src="profile.pictureLink" alt="Profile image" />
          </div>
        </div>
      </header>
      <div id="projects-info">
        <div class="data">
          <div>
            <h3>{{ statusCount.total }}</h3>
            <p>Projetos ao total</p>
          </div>
          <div>
            <h3>{{ statusCount.progress }}</h3>
            <p>Em andamento</p>
          </div>
          <div>
            <h3>{{ statusCount.done }}</h3>
            <p>Encerrados</p>
          </div>
        </div>
        <button @click="$router.push('/job')">
          <img src="../assets/plus.svg" alt="plus" />
          Adicionar Novo Job
        </button>
      </div>
    </div>
    <main>
      <div v-for="(job, idx) in jobs" :key="idx" class="projects">
        <JobItem :job="{ ...job, idx: idx }" @delete="handleDeleteJob" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import JobItem from "@/components/JobItem.vue"; // @ is an alias to /src
import { IJob } from "@/models/job";
import { deleteJob, loadJobs } from "@/services/job";
import { loadFormattedData } from "@/utils";

export default Vue.extend({
  name: "Home",
  components: {
    JobItem,
  },
  data() {
    return {
      freeHours: 0,
      statusCount: {
        progress: 0,
        done: 0,
        total: 0,
      },
      profile: this.$root.$data.currentProfile,
      jobs: [] as IJob[],
    };
  },

  async mounted() {
    const data = await loadFormattedData();
    this.statusCount = data.statusCount;
    this.freeHours = data.freeHours;
    this.jobs = data.updatedJobs;
  },
  methods: {
    async handleDeleteJob(id: number) {
      await deleteJob(id);
      const data = await loadFormattedData();
      this.statusCount = data.statusCount;
      this.freeHours = data.freeHours;
      this.jobs = data.updatedJobs;
    },
  },
});
</script>

<style lang="scss" scoped>
div.home {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
div.top-panel {
  position: relative;
  width: 100%;
  height: 280px;
  background-color: #41414c;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 32px;
  color: #fcfdff;

  header {
    width: 100%;
    height: 64px;
    max-width: 1120px;
    border-bottom: 1.5px solid #4f4f5b;
    padding-bottom: 24px;

    > div#header-content {
      width: 100%;
      height: 100%;
      max-width: 1120px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        display: flex;
        align-items: center;
      }
      div.alert-info {
        gap: 0.5rem;
      }
      > div.profile {
        gap: 1rem;
        text-align: right;

        div.description {
          flex-direction: column;
          h3 {
            font-size: 20px;
          }
          a {
            text-decoration: none;
            color: #bfbfcc;
          }
        }

        img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 2.5px solid #f1972c;
          box-sizing: border-box;
          object-fit: cover;
        }
      }
    }
  }

  div#projects-info {
    width: 100%;
    height: 64px;
    max-width: 1120px;
    margin-top: 32px;
    display: flex;
    justify-content: space-between;

    > div.data {
      display: flex;

      > div {
        margin-right: 40px;
        h3 {
          line-height: 26px;
          font-size: 24px;
        }
        p {
          color: #bfbfcc;
        }
      }
    }

    button {
      background: #f1972c;
      border-radius: 5px;
      width: 260px;
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px 32px 12px 12px;
      font-weight: bold;
      font-size: 14px;
      transition: background-color 0.3s;

      img {
        margin-right: 32px;
      }

      &:hover {
        background-color: #fa9c2d;
        transition: 0.3s;
      }
    }
  }
}

main {
  position: absolute;
  height: 64px;
  width: 100%;
  max-width: 1120px;
  top: 232px;

  > div.projects {
    position: relative;
  }
}
</style>