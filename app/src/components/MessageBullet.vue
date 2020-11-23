<template>
  <v-card style="max-width: 250px; min-height: 50px; text-align: left">
    <v-card-text style="word-break: normal; padding: 5px 10px ">
      <b>{{sender}}:</b><br>
      {{message}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MessageBullet",
  props: ['sender', 'message'],
}
</script>

<style scoped>

</style>