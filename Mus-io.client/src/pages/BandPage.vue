<template>
  <div class="container-fluid bg-gradient">
    <div class="row">
      <div class="col-12 p-4">
        <img
          src="https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt=""
          class="img-fluid img-banner"
        />
      </div>
      <div class="col-12 ps-4 pb-3">
        <h1 class="text-light title">Joji</h1>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-3">
            <div class="row">
              <div class="col-12 text-light ps-4 pb-3">Rap</div>
              <div class="col-12 text-light ps-4 pb-3">
                Base Asking Price: $3,000
              </div>
              <div class="col-12 text-light ps-4 pb-3">
                <a href=""
                  ><h3><i class="mdi mdi-spotify"></i></h3>
                </a>
              </div>
              <div class="col-12 text-light ps-4 pb-3">
                <a href=""
                  ><h3><i class="mdi mdi-soundcloud"></i></h3>
                </a>
              </div>
              <div class="col-12 ps-4 pb-3">
                <button class="btn btn-primary">Click Me</button>
              </div>
              <div class="col-12 ps-4 pb-3">
                <button class="btn btn-primary">Placeholder</button>
              </div>
            </div>
          </div>
          <div class="col-9 text-light">
            <h3 class="ps-4 pb-3">About</h3>
            <p class="ps-4 pb-3">
              The thing about Joji is that he’s actually filthy frank and that’s
              absurd and I love it. here’s some more text abbout this guy who
              does things and I wonder how many useless things I can say to fill
              this space but I am going to try my worst to do so hey look it’s
              working I am actually filling this space with the utmost garbage
              my english professor would be so proud of how shitty this long
              sentence is and how many clauses there are involved in becoming
              the worst englisher in the history of medeval alchemy I don’t even
              know what that means but remember to write it down or something
              also don’t forget your pants when you walk out your front door
              because they might be useful for storing surplus food in your
              pockets like napolean dynamite does with pedro when he jumps that
              ramp with his bike and all his tots fall out of his pocket that
              actually never happened but you get the idea of lorem ipsum
              garbage text to fill area where meaningful bios are supposed to go
              I am really sorry if you made it this far in reading this text
              because by now your brain probably hurts to the pineal gland and
              will never recover from such endeavors
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 spacer" style="height: 15vh"></div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      band: computed(() => AppState.activeBand)
    }
  }
}
</script>


<style lang="scss" scoped>
.img-banner {
  height: 50vh;
  width: 100%;
  object-fit: cover;
}
.title {
  font-size: 40pt;
}
</style>