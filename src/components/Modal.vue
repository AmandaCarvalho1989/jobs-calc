<template>
  <div :class="`${open ? 'modal-wrapper on' : 'modal-wrapper'}`">
    <div class="modal">
      <img src="../assets/delete.svg" alt="Excluir Job" title="Excluir Job" />
      <h3>Excluir Job</h3>
      <!-- ${open ? 'modal on': 'modal'} -->
      <p>
        Quer mesmo excluir esse job? <br />
        Ele será apagado para sempre.
      </p>
      <footer>
        <button class="button cancer" @click="closeModal">Cancelar</button>
        <button class="button red" @click="handleDelete()">
          Excluir Job
        </button>
      </footer>
    </div>
    <!-- <form method="post" action="/job/delete" id="delete-job"></form> -->
  </div>
</template>
<script lang="ts">
import { IJob } from "@/models/job";
import { deleteJob } from "@/services/job";
import Vue from "vue";

export default Vue.extend({
  name: "Modal",
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    open: Boolean,
    job: Object as () => IJob,
  },
  mounted() {
    this.isOpen = this.open;
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
    },
    async handleDelete() {
      await deleteJob(Number(this.job.id)).then(() => {
        this.closeModal();
        this.$router.push("/");
      });
    },
  },
  watch: {
    open: function (newVal, oldVal) {
      // watch it
      this.isOpen = newVal;
    },
  },
});
</script>

<style >
.modal-wrapper {
  visibility: hidden;
  opacity: 0;
}

.modal-wrapper.on {
  height: 100vh;
  width: 100vw;

  position: fixed;
  top: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;

  visibility: visible;
  opacity: 1;
  z-index: 100;
}

.modal {
  background: #f0f2f5;

  border-radius: 0.313rem;

  padding: 2.5rem;

  text-align: center;

  color: #787880;
}

.modal img {
  margin-bottom: 2rem;
}

.modal h3 {
  color: #5a5a66;

  font-family: IBM Plex Sans;
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.625rem;

  margin-bottom: 0.5rem;
}

.modal p {
  margin-bottom: 2rem;
}

.modal footer button {
  padding: 0.75rem 3rem;
  border-radius: 0.313rem;

  font-family: IBM Plex Sans;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.625rem;
  text-transform: uppercase;

  transition: all 0.2s;

  cursor: pointer;
}

.modal footer button + button {
  margin-left: 0.5rem;
}

.modal footer button:nth-child(1) {
  color: #787880;
  background: #e1e3e5;
}

.modal footer button:nth-child(1):hover {
  background: #eceef0;
}

.modal footer button:nth-child(2) {
  background: #eb3b35;
}

.modal footer button:nth-child(2):hover {
  background: #fa3f38;
}
</style>