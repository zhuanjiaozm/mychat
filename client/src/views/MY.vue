<template>
  <div>
    {{user.name}}
    <van-button round type="danger" @click="logoutSys" size="small">退出登录</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$store.state.user || {},
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      loading: false,
      user: this.$store.state.user || {}
    };
  },
  methods: {
    logoutSys() {
      if (this.user) {
        this.loading = true;
        this.$axios.post("logout", this.user).then(response => {
          if (response.success) {
            this.$notify({ type: "success", message: "登出系统成功" });
            this.logout();
          } else {
            this.$notify({ type: "danger", message: "登出系统失败" });
          }
          this.loading = false;
        });
      }
    },
    logout() {
      this.$store.commit("clearToken");
      this.$store.commit("setUser", {});
      setTimeout(() => {
        this.$router.push({ path: "/login" });
      }, 500);
    }
  },
  mounted() {
    // this.logoutSys();
  }
};
</script>
