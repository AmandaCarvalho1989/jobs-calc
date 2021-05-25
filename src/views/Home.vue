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
        <JobItem :job="{ ...job, idx: idx }" @delete="deleteJob" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import JobItem, { IJob } from "@/components/JobItem.vue"; // @ is an alias to /src
import { IProfile } from "@/views/Profile.vue";
import api from "@/services/api";
import { calculateBudget, remainingDays } from "@/utils";

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
      profile: {} as IProfile,
      jobs: [] as IJob[],
    };
  },

  created() {
    Promise.all([api.get("/profile"), api.get<IJob[]>("/jobs")]).then(
      (values) => {
        const profileData = values[0].data;
        const jobs = values[1].data;

        this.profile.name = profileData.name;
        this.profile.pictureLink = profileData.pictureLink;

        let statusCount = {
          progress: 0,
          done: 0,
          total: jobs.length,
        };
        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
          // ajustes no job
          const remaining = remainingDays(job);
          const status = remaining <= 0 ? "done" : "progress";

          // Somando a quantidade de status
          statusCount[status] += 1;

          // total de horas por dia de cada Job em progresso
          jobTotalHours =
            status == "progress"
              ? jobTotalHours + Number(job.dailyHours)
              : jobTotalHours;

          return {
            ...job,
            remaining,
            status,
            budget: calculateBudget(job, this.profile.valueHour),
          };
        });
        this.statusCount = statusCount;
        this.freeHours = this.profile.hoursPerDay - jobTotalHours;
        this.jobs = updatedJobs;
      }
    );
  },
  methods: {
    deleteJob(event: any, value: any) {
     return console.log(event, value);
      // await api.delete(`/jobs/${id}`);
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