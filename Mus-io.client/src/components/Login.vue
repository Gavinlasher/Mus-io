<template>
  <span class="navbar-text">
    <button
      class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>

    <div class="dropdown my-2 my-lg-0" v-else>
      <div
        class="dropdown-toggle selectable"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="authDropdown"
      >
        <div v-if="account.picture">
          <img
            :src="account.picture"
            alt="account photo"
            height="20"
            class="login-img border border-dark"
          />
          <span class="mx-3 text-success lighten-30 main-font">{{
            account.name
          }}</span>
        </div>
      </div>
      <div
        class="dropdown-menu p-0 list-group w-100"
        aria-labelledby="authDropdown"
      >
        <router-link :to="{ name: 'Profile', params: { id: account.id } }">
          <div
            class="main-font list-group-item list-group-item-action hoverable"
          >
            My Profile
          </div>
        </router-link>
        <div
          class="list-group-item list-group-item-action hoverable text-danger"
          @click="logout"
        >
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div>
  </span>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
.login-img {
  height: 7vh;
  width: 7vh;
  border: 1px solid white;
  border-radius: 50%;
}
.main-font {
  font-family: "Chakra Petch", sans-serif;
}
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch&family=Teko:wght@300&display=swap");
</style>
