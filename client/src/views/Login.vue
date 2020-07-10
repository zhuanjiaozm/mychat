<template>
  <ul class="form">
    <li style="text-align:center">
      <img :src="circleUrl" class="avatar">
    </li>

    <li>
      <van-field v-model="user.tel" type="tel" label="手机" />
    </li>

    <li>
      <van-field v-model="user.password" type="password" label="密码" />
    </li>

    <li style="text-align:center">
      <van-button type="info" round @click="toReg">
        <van-icon name="arrow-left" />注册
      </van-button>
      <van-button type="primary" round @click="login" :loading="loading" :disabled="loading">
        <van-icon name="success" />登录
      </van-button>

    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      loading: false,
      user: {
        password: '',
        tel: this.$route.query.tel || '',
      },
    };
  },
  methods: {
    toReg() {
      this.$router.push({ path: '/addUser', query: { tel: this.user.tel } });
    },
    checkUserInfo() {
      let hasError;
      if (!this.user.tel) {
        hasError = true;
        this.$dialog.alert({
          message: '请填写电话',
        });
      } else if (!this.user.password) {
        hasError = true;
        this.$dialog.alert({
          message: '请填写密码',
        });
      } else {
        hasError = false;
      }
      return hasError;
    },

    login() {
      if (!this.checkUserInfo()) {
        this.loading = true;
        this.$axios.post('login', this.user).then((response) => {
          if (response.success) {
            this.$notify({ type: 'success', message: '登录成功' });
            this.$store.commit('setToken', response.token);
            setTimeout(() => {
              this.$router.push({ path: '/list' });
            }, 500);
          } else {
            this.$notify({ type: 'danger', message: '手机号码和密码不匹配' });
          }
          this.loading = false;
        });
      }
    },
  },
  mounted() {

    // this.addUser();
  },
};
</script>

<style lang="scss" scoped>
ul {
  padding: 1rem 0.5rem;
  height: 100%;
  background-color: $myBgColor;
  li {
    margin: 0.5rem auto;
    .avatar {
      height: 1.5rem;
      width: 1.5rem;
    }
    .van-button {
      margin: 0 0.5rem;
      .van-icon {
        font-size: 150%;
        margin-right: 0.1em;
        vertical-align: middle;
      }
    }
  }
}
</style>
