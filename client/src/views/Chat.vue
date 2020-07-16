<template>
  <div>
    <van-nav-bar :title="receiver.name" left-text left-arrow @click-left="onClickLeft" />

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad" id="list">
        <van-cell
          v-for="item in list"
          :key="item.msg"
          class="msg"
          :class="[Boolean(item.userID == user['_id']) ?  'text-right':'text-left' ]"
        >
          <div class="text">
            {{ item.msg }}
            <i>({{ item.time }})</i>
          </div>
          <div></div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <audio src="/static/medea/message.mp3" id="audio" autoplay></audio>
    <van-field
      v-model="msg"
      center
      clearable
      label="消息"
      placeholder="请输入你要发的信息"
      v-on:keyup.enter="keyUp($event)"
      autofocus="true"
    >
      <template #button>
        <van-button
          size="small"
          type="primary"
          :disabled="!Boolean(msg.length)"
          @click="websocketsend"
        >发送</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      isLoading: false,
      path: "ws://localhost:8802/ws/chat/",
      user: this.$store.state.user || {},
      receiver: JSON.parse(sessionStorage.getItem("receiver")) || {},
      websock: {},
      list: [],
      finished: true,
      loading: false,
      msg: ""
    };
  },
  mounted() {
    // 初始化
    this.initWebSocket();
    this.getList();
  },
  destroyed() {
    // 销毁监听
    this.websock.onclose = this.close;
  },
  methods: {
    //顶部下拉刷新
    onRefresh() {
      this.list = [];
      this.getList();
    },

    // 监听回车发送消息
    keyUp(ev) {
      if (ev.keyCode === 13) {
        this.websocketsend();
        this.scrollBottom();
        this.msg = "";
      }
    },

    // 返回上一页
    onClickLeft() {
      window.history.go(-1);
      sessionStorage.setItem("receiver", "");
    },
    //获取聊天记录
    getList() {
      this.isLoading = true;
      this.$axios
        .post("getChatRecord", {
          userID: this.user["_id"],
          receiveID: this.receiver["_id"]
        })
        .then(response => {
          this.list = response;
          this.isLoading = false;
          this.scrollBottom();
        });
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
      // console.log("连接建立之后执行send方法发送数据");
      // this.websocketsend("连接建立之后执行send方法发送数据");
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      this.list.push(redata);
      this.scrollBottom();
    },
    websocketsend() {
      //数据发送
      if (this.msg) {
        this.websock.send(this.msg);
        this.list.push({
          msg: this.msg,
          receiveID: this.receiver["_id"],
          time: this.$moment().format("YYYY/MM/DD HH:mm:ss"),
          userID: this.user["_id"]
        });
        this.msg = "";
        this.scrollBottom();
      }
    },
    websocketclose() {
      //关闭
      console.log("断开连接:", this.user["_id"]);
    },
    scrollBottom() {
      setTimeout(() => {
        let list = document.getElementById("list"); // 获取对象
        list.scrollTop = list.scrollHeight; // 滚动高度
      }, 100);
    }
  }
};
</script>

<style>
.van-cell .msg {
  padding: 0;
}

.text-right > .van-cell__value {
  text-align: right;
  color: gray;
}

.text-left .text {
  background-color: lightgreen;
  /* width: 80%; */
  border-radius: 7px;
  padding: 0 5px;
  float: left;
}
.text-right .text {
  background-color: gray;
  /* width: 80%; */
  border-radius: 7px;
  padding: 0 5px;
  float: right;
  color: white;
}
.van-list {
  overflow-y: scroll;
  height: 77vh;
}
</style>
