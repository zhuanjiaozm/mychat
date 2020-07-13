<template>
  <div class="container">
    <van-search
      v-model="keyword"
      background="rgb(79, 192, 141)"
      shape="round"
      placeholder="请输入搜索好友信息"
    />

    <div class="list">
      <van-swipe-cell v-for="item in list" :key="item._id">
        <div
          class="li"
          @click="toChat(item)"
          :class="[Boolean(item.isOnline) ? 'isOnline' : 'isOffline' ]"
        >
          <div class="avator">
            <img :src="item.circleUrl" />
          </div>
          <div class="center">{{item.name}}【{{item.tel}}】</div>

          <div class="right">
            <van-icon name="chat-o" badge="9" />
          </div>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<style lang="scss">
.isOnline {
  color: black;
}
.isOffline {
  color: gray;
}

.container {
  display: flex;
  flex-direction: column; /*横向*/
  height: 100%;
  .search {
    margin: 0.1rem 0;
  }
  .list {
    flex: 1;
    overflow-y: scroll;
    .li {
      height: 0.88rem;
      line-height: 0.88rem;
      display: flex;
      border-bottom: 1px solid #bcb9b94f;
      .avator {
        width: 1rem;
        img {
          height: 80%;
          margin: 0.1rem;
          border-radius: 50%;
        }
      }
      .right {
        color: #c5c5c5;
        text-align: right;
        flex: 1;
        padding-right: 0.5rem;
        font-size: 160%;
        color: $myColor;
        .van-icon {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: "list",
  data() {
    return {
      keyword: "",
      user: {
        age: 11,
        name: "小",
        tel: "13277092789"
      },
      list: [],
      addUserResult: ""
    };
  },
  methods: {
    addUser() {},

    toChat(user) {
      this.$router.push({ path: `/chat/${user["_id"]}` });
      sessionStorage.setItem("receiver", JSON.stringify(user));
    },

    getList() {
      this.$axios.fetch("getList").then(response => {
        this.list = response;
      });
      this.list = [
        {
          user: "name"
        }
      ];
    }
  },
  mounted() {
    this.getList();

    // this.addUser();
  }
};
</script>
