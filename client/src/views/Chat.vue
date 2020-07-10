<template>
    <div>
        <button @click="send">发消息</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      path: 'ws://localhost:8802/ws/chat',
      socket: '',
    };
  },
  mounted() {
    // 初始化
    this.init();
  },
  methods: {
    init() {
      this.socket = new WebSocket(this.path);
      // 监听socket连接
      this.socket.onopen = this.open;
      // 监听socket错误信息
      this.socket.onerror = this.error;
      // 监听socket消息
      this.socket.onmessage = this.getMessage;
    },
    open() {
      console.log('socket连接成功');
    },
    error() {
      console.log('连接错误');
    },
    getMessage(msg) {
      console.log(msg.data);
    },
    send() {
      this.socket.send('params');
    },
    close() {
      console.log('socket已经关闭');
    },
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  },
};
</script>

<style>

</style>
