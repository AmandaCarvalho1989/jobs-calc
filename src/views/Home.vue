<template>
  <div class="home">
    <div class="top-panel">
      <header>
        <div id="header-content">
          <img src="../assets/logo.png" alt="Jobs Calc Logo" />
          <div class="alert-info">
            <img src="../assets/alert-octagon.svg" alt="alert" />
            <p>Você tem 2 horas livres no seu dia</p>
          </div>
          <div class="profile">
            <div class="description">
              <h3>Jaqueline</h3>
              <router-link to="/profile"> Ver perfil</router-link>
              <!-- <p>Ver perfil</p> -->
            </div>
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
              alt="Profile image"
            />
          </div>
        </div>
      </header>
      <div id="projects-info">
        <div class="data">
          <div>
            <h3>{{ projects.length }}</h3>
            <p>Projetos ao total</p>
          </div>
          <div>
            <h3>{{ doingProjectsQty }}</h3>
            <p>Em andamento</p>
          </div>
          <div>
            <h3>{{ doneProjectsQty }}</h3>
            <p>Encerrados</p>
          </div>
        </div>
        <button>
          <img src="../assets/plus.svg" alt="plus" />
          Adicionar Novo Job
        </button>
      </div>
    </div>
    <main>
      <div v-for="project in projects" :key="project.id">
        <Project :project="project" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Project, { IProject } from "@/components/Project.vue"; // @ is an alias to /src
import api from "@/services/api";

export default Vue.extend({
  name: "Home",
  components: {
    Project,
  },
  data() {
    return {
      projects: [] as IProject[],
    };
  },

  created() {
    return api.get("/projects").then((response) => {
      this.projects = response.data;
    });
  },
  computed: {
    doingProjectsQty(): number {
      return this.projects.filter((project) => project.status === "DOING")
        .length;
    },
    doneProjectsQty(): number {
      return this.projects.filter((project) => project.status === "DONE")
        .length;
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
}
</style>