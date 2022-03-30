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
import { watchEffect } from "@vue/runtime-core"
import { Modal } from "bootstrap"
import Pop from '../utils/Pop'
export default {
  props: {
    accountData: {
      type: Object,
      required: false,
    }
  },
  setup(props) {
    const editable = ref({})
    watchEffect(() => {
      logger.log("this is thw watch effect for the account")
      editable.value = props.accountData
    })
    return {
      editable,
      async editAccount() {
        try {
          await accountService.editAccount(editable.value)
          Modal.getOrCreateInstance(document.getElementById('edit-account')).hide()
          Pop.toast('Account Edited', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>