<template>
  <message-bullet :sender="testSender" :message="testMessage"></message-bullet>
</template>

<script>
import MessageBullet from "@/components/MessageBullet";

export default {
  name: "MessageBoard",
  components: {MessageBullet},
  data() {
    return {
      testSender: 'sender',
      testMessage: 'messagemessagemessagemessagemessagemessagemessagemessagemessagemessage',
      senders: [],
      messages: [],
    }
  }
}
</script>

<style scoped>

</style>