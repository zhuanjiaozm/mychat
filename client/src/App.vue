<template>
  <div id="app">
    <div id="router">
      <router-view />
    </div>
    <ul id="menu">
      <li>
        <router-link to="/list">
          <van-icon name="friends-o" />列表
        </router-link>
      </li>
      <li>
        <router-link to="/chat">
          <van-icon name="comment-o" />对话
        </router-link>
      </li>
      <li>
        <router-link to="/about">
          <van-icon name="gem-o" />发现
        </router-link>
      </li>
      <li>
        <router-link to="/my">
          <van-icon name="user-circle-o" />我的
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
* {
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-size: 0.3rem;
  // overflow: hidden;
}
#nprogress .bar {
  background: $myColor !important; //自定义颜色
}
body {
  height: 100vh;
  // background-color: #000dff0d;
}
#app {
  display: flex;
  flex-direction: column; /*横向*/
  width: 100%;
  height: 100vh;
  overflow: hidden;
  #router {
    flex: 1;
    overflow: hidden;
  }

  #menu {
    width: 100%;
    background-color: #c5c5c561;
    padding-bottom: 0.1rem;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      a {
        text-decoration: none;
        color: black;
        i {
          display: block;
          font-size: 150%;
          padding: 0.2rem 0;
        }
      }
    }
  }
}
</style>
