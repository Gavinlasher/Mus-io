<template>
  <div>
    <div
      @click="goTo('Offer')"
      class="col-10 m-4 bg-primary shadow rounded hoverable p-3 card"
    >
      <h3>{{ acceptedOffer.creator.name }}: {{ acceptedOffer.body }}</h3>
    </div>
  </div>
</template>


<script>
import { useRouter } from "vue-router"
export default {
  props: {
    acceptedOffer: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    return {
      goTo(page) {
        router.push({
          name: page,
          params: { id: props.acceptedOffer.id },
        })
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.hoverable:hover {
  transform: scale(1.03);
  transition: 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;
}
.hoverable:active {
  transform: scale(0.98);
  transition: 50ms ease-in-out;
}
</style>