<template>
  <div>
    <van-button round type="danger" @click="logout" size="small">
      退出登录
    </van-button>
  </div>
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
    logout() {
      this.$notify({ type: 'success', message: '退出成功' });
      this.$store.commit('clearToken');
      setTimeout(() => {
        this.$router.push({ path: '/login' });
      }, 500);
    },
  },
  mounted() {

    // this.addUser();
  },
};
</script>
