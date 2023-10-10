<template>
  <div class="modal fade" :class="{ show: showModal }" id="popUp" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">CBD</h5>
          <button type="button" class="close" @click="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Questionnaire</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gtag from '../../services/util/gtag';

export default {
    name: 'popUp',
    data() {
        return {
            showModal: false,
        }
    },
    mounted() {
    setTimeout(() => {
            this.showModal = true;
        }, 100);
    },
    methods: {
        closeModal() {
            this.showModal = false;
        },
    }
}
</script>

<style scoped />