<template>
  <form
    class="
      bg-grey
      darken-20
      justify-content-center
      elevation-3
      shadow
      col-8
      p-2
      m-5
    "
    @submit.prevent="editAccount"
  >
    <h2>Edit Account</h2>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Name: </label>
      <input
        v-model="editable.name"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Name....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Email: </label>
      <input
        v-model="editable.email"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="email here....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Picture: </label>
      <input
        v-model="editable.picture"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="picture url....."
      />
    </div>
    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">edit</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { logger } from "../utils/Logger"
import { accountService } from "../services/AccountService"
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async editAccount() {
        try {
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>