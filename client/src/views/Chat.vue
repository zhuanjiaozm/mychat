<template>
  <div>
    <van-nav-bar :title="receiver.name" left-text left-arrow @click-left="onClickLeft" />

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.msg" class="msg">
        <div>{{item.msg}}</div>
        <div>{{item.time}}</div>
      </van-cell>
    </van-list>
    <van-field v-model="msg" center clearable label="消息" placeholder="请输入你要发的信息">
      <template #button>
        <van-button size="small" type="primary" @click="websocketsend">发送</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      path: "ws://localhost:8802/ws/chat/",
      user: this.$store.state.user || {},
      receiver: JSON.parse(sessionStorage.getItem("receiver")) || {},
      websock: {},
      list: [],
      finished: true,
      loading: false,
      msg: "一起去爬山吗？"
    };
  },
  mounted() {
    // 初始化
    this.initWebSocket();
    console.log("this.$store.state.user", this.$store.state.user);
  },
  methods: {
    // 返回
    onClickLeft() {
      window.history.go(-1);
      sessionStorage.setItem("receiver", "");
    },

    onLoad() {},
    initWebSocket() {
      //初始化weosocket
      this.websock = new WebSocket(
        this.path + this.$store.state.user["_id"] + "/" + this.receiver._id
      );
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      console.log("连接建立之后执行send方法发送数据");
      this.websocketsend("连接建立之后执行send方法发送数据");
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      console.log(redata);
      this.list.push(redata);
    },
    websocketsend() {
      //数据发送
      this.websock.send(this.msg);
      this.msg = "";
    },
    websocketclose() {
      //关闭
      console.log("断开连接:", this.user["_id"]);
    }
  },
  destroyed() {
    // 销毁监听
    this.websock.onclose = this.close;
  }
};
</script>

<style>
</style>
