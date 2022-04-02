<template>
  <header class="container-fluid">
    <div class="row">
      <Navbar />
    </div>
  </header>
  <main class="container-fluid bg-gradient">
    <router-view />
  </main>
  <footer></footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
