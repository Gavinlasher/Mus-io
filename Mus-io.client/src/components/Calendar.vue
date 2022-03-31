<template>
  <FullCalendar />
</template>


<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { reactive } from "@vue/reactivity"
export default {
  setup() {
    const options = reactive({
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin,]
      , initialView: 'dayGridMonth'
    })
    return {
      options
    }
  }
}
</script>


<style lang="scss" scoped>
</style>