<template>
  <div id="profile-container">
    <Header :label="`Meu perfil`" />
    <main>
      <div class="profile-info">
        <img :src="profile.pictureLink" alt="Profile image" />
        <h2>{{ profile.name }}</h2>
        <p>
          O valor da sua hora é

          <strong>R$ {{ profile.valueHour }} </strong>
        </p>
        <button @click="updateProfileData(profile)">Salvar dados</button>
      </div>
      <div class="profile-data">
        <section>
          <h1>Dados do perfil</h1>
          <div class="input-group">
            <Input
              name="name"
              placeholder="Name"
              label=""
              :value="profile.name"
              v-model="profile.name"
            />
            <Input
              name="pictureLink"
              placeholder="Picture Link"
              label=""
              v-model="profile.pictureLink"
              :value="profile.pictureLink"
            />
          </div>
        </section>
        <section>
          <h1>Planejamento</h1>
          <div class="input-group">
            <Input
              name="monthlyBudget"
              label="Quanto eu quero ganhar por mês?"
              type="number"
              v-model="profile.monthlyBudget"
              :value="profile.monthlyBudget"
            />
            <Input
              name="hoursPerDay"
              label="Quantas horas quero trabalhar por dia?"
              type="number"
              v-model="profile.hoursPerDay"
              :value="profile.hoursPerDay"
            />
          </div>
          <div class="input-group">
            <Input
              name="daysPerWeek"
              label="Quantos dias quero trabalhar por semana?"
              type="number"
              v-model="profile.daysPerWeek"
              :value="profile.daysPerWeek"
            />
            <Input
              name="vacationsPerYear"
              label="Quantas semanas quer tirar férias(anual) ?"
              type="number"
              v-model="profile.vacationsPerYear"
              :value="profile.vacationsPerYear"
            />
          </div>
        </section>
      </div>
    </main>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Header from "@/components/Header.vue";
import Input from "@/components/Input.vue";
import { updateProfileData } from "@/services/profile";
import { IProfile } from "@/models/profile";

export default Vue.extend({
  name: "Home",
  components: {
    Header,
    Input,
  },
  data() {
    return {
      profile: {} as IProfile,
    };
  },
  mounted() {
    this.profile = this.$root.$data.currentProfile;
  },
  methods: {
    updateProfileData,
  },
});
</script>

<style lang='scss' scoped>
div#profile-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  main {
    position: relative;
    width: 1120px;
    height: calc(100% - 72px);
    max-width: 1120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;
    > div.profile-info {
      width: 352px;
      min-width: 352px;
      height: 456px;
      background: #fcfdff;
      border: 1px solid #e1e3e6;
      box-sizing: border-box;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      color: #5a5a66;
      text-align: center;
      padding: 32px 0px;

      img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        border: 2.5px solid #f1972c;
        box-sizing: border-box;
        object-fit: cover;
        margin-bottom: 24px;
      }
      h2 {
        font-size: 28px;
        font-family: IBM Plex Sans;
        font-weight: 600;
      }

      p {
        display: flex;
        flex-direction: column;
        font-size: 20px;
        line-height: 30px;

        strong {
          font-weight: 600;
        }
      }

      button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 12px 48px;
        width: 200px;
        height: 50px;
        background: #36b336;
        border-radius: 5px;

        margin-top: 24px;
      }
    }
    > div.profile-data {
      width: 100%;
      height: 456px;
      display: flex;
      flex-direction: column;
      color: #5a5a66;
      text-align: left;

      section {
        &:last-child {
          margin-top: 2.25rem;
        }

        > div.input-group:last-child {
          margin-top: 20px;
        }
      }
      h1 {
        font-family: IBM Plex Sans;
        font-weight: 600;
        font-size: 32px;
        line-height: 42px;
        border-bottom: 1.5px solid #e1e3e5;
        padding-bottom: 0.5rem;
      }
    }
  }
}
</style>