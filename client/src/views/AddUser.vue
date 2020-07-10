<template>
  <ul class="form">
    <li style="text-align:center">
      <img :src="user.circleUrl" class="avatar">
    </li>
    <li>
      <van-field v-model="user.name" label="昵称" />
    </li>
    <li>
      <van-field v-model="user.password" type="password" label="密码" />
    </li>
    <li>
      <van-field v-model="user.tel" type="tel" label="手机" />
    </li>
    <li>
      <van-field readonly v-model="user.birth" label="生日" @click="show = true" />
      <van-calendar v-model="show" @confirm="onConfirm" title="破蛋日" :min-date="minDate" :max-date="maxDate" />
    </li>
    <li>
      <van-radio-group v-model="user.sex" direction="horizontal">
        <van-radio name="1">男</van-radio>
        <van-radio name="2">女</van-radio>
      </van-radio-group>
    </li>
    <li style="text-align:center">
      <van-button type="info" round @click="toLogin">
        <van-icon name="arrow-left" />登录
      </van-button>
      <van-button type="primary" round @click="addUser" :loading="loading" :disabled="loading">
        <van-icon name="success" />注册
      </van-button>
    </li>
  </ul>
</template>

<script>
import { Dialog } from 'vant';

export default {
  data() {
    return {
      loading: false,
      show: false,
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      user: {
        sex: '1',
        name: '',
        password: '',
        tel: this.$route.query.tel || '',
        circleUrl: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3256100974,305075936&fm=26&gp=0.jpg',
        birth: '',
      },
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ path: '/login', query: { tel: this.user.tel } });
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.user.birth = this.formatDate(date);
    },
    checkUserInfo() {
      let hasError;
      if (!this.user.name) {
        hasError = true;
        Dialog.alert({
          message: '请填写昵称',
        });
      } else if (!this.user.password) {
        hasError = true;
        Dialog.alert({
          message: '请填写密码',
        });
      } else if (!this.user.tel) {
        hasError = true;
        Dialog.alert({
          message: '请填写电话',
        });
      } else if (!this.user.birth) {
        hasError = true;
        Dialog.alert({
          message: '请填写生日',
        });
      } else {
        hasError = false;
      }
      return hasError;
    },
    addUser() {
      if (!this.checkUserInfo()) {
        this.loading = true;
        this.$axios.post('addUser', this.user).then((response) => {
          if (response.success) {
            this.$notify({ type: 'success', message: '注册成功' });
            setTimeout(() => {
              this.toLogin();
            }, 500);
          } else {
            this.$notify({ type: 'danger', message: response.data || '注册失败' });
          }
          this.loading = false;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  padding: 1rem 0.5rem;
  height: 100%;
  background: $myBgColor;
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
